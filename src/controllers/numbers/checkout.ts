import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { updateNumberById, cheackout, validateIds, validateReference } from "../../repository/number/numbersService";
import SendPaymentConfirmationMessage from '../../chatbot/messages/sendPaymentConfirmationMessage';
import SendAdminMessage from '../../chatbot/messages/sendAdminMessage';

const checkout = async (req: Request, res: Response) => {
    try {
        const { ids, file, phone, reference, entity } = req.body;
        if (!file || !ids || !phone || !reference || !entity)
            throw new ErrorHandler("Fields are required", 400);
        if (!file.secure_url || !file.asset_id)
            throw new ErrorHandler("Invalid file format", 400);

        const isReferenceValid = await validateReference(reference)
        if (isReferenceValid.length > 0)
            throw new ErrorHandler("Reference already exists", 400);

        const areAllIdsValid = await validateIds(ids, true);
        if (!areAllIdsValid)
            throw new ErrorHandler("ID is invalid", 400);

        const formFile = {
            ref: reference,
            bank: entity,
            asset_id: file.asset_id,
            secure_url: file.secure_url,
            creation_date: new Date(),
        };

        const createInvoice = await cheackout(formFile)
        if (!createInvoice)
            throw new ErrorHandler("Error creating invoice", 400);

        const updatedNumbers = await Promise.all(
            ids.map((id: string) => updateNumberById(id, {
                invoice_id: createInvoice.id,
                payment_status: 'pre-approved',
                update_date: new Date(),
            }))
        );

        const phoneAdmin = process.env.PHONE_ADMIN;
        const sendMessageResponse = await SendPaymentConfirmationMessage(phone)
        const sendMessageAdminResponse = await SendAdminMessage(phoneAdmin!)
        if (!sendMessageResponse || !sendMessageAdminResponse)
            throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);

        return res.status(200).send({ message: "success", data: updatedNumbers });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_CREATE_INVOICE";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default checkout;