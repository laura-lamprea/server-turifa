import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { updateNumberById } from "../../repository/number/numbersService";
import { sendToRejected, validateIdforStatus } from "../../repository/admin/adminService";

const changeToRejected = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body; 

        const areAllIdsValid = await validateIdforStatus(ids);
        if (areAllIdsValid.length !== ids.length) throw new ErrorHandler("One or more IDs are invalid (do not exist) or are not reserved or are not pending", 400);

        await Promise.all(
            areAllIdsValid.map(async ({ id, num, phone, name, creation_date }) => {
                try {
                    const sendRejected = await sendToRejected({ num: num!, name: name!, phone: phone!, creation_date: creation_date! });
                    if (!sendRejected) throw new ErrorHandler("ERROR_SENDING_TO_REJECTED", 400);
                    const numberUpdated = await updateNumberById(id, {
                        isReserved: false,
                        payment_status: 'rejected',
                        update_date: new Date(),
                    });
                    if (!numberUpdated) throw new ErrorHandler("ERROR_UPDATING_TO_REJECTED", 400);
                } catch (error) {
                    throw new ErrorHandler("ERROR_UPDATING_TO_REJECTED", 400);
                }
            })
        );
        return res.status(200).send({ message: "success" });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_UPDATING_NUMBER_TO_REJECT";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default changeToRejected;
