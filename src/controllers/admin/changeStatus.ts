import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { updateNumberById } from "../../repository/number/numbersService";
import { validateIdforStatus } from "../../repository/admin/adminService";
import SendApprovedMessage from '../../chatbot/messages/sendApprovedMessage';

const changeStatus = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        const areAllIdsValid = await validateIdforStatus(ids);
        if (areAllIdsValid.length !== ids.length) {
            throw new ErrorHandler("One or more IDs are invalid (do not exist) or are not reserved or are not pending", 400);
        }
        const updatedStateNumbers = await Promise.all(
            ids.map((id: string) => updateNumberById(id, {
                payment_status: 'approved',
                update_date: new Date(),
            }))
        );

        const phones = [...new Set(areAllIdsValid.map((num) => num.phone))];
        if (phones.length > 0)
            phones.map(phone => SendApprovedMessage(phone!))

        return res.status(200).send({ message: "success", data: updatedStateNumbers });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_UPDATING_STATUS_NUMBER";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default changeStatus;
