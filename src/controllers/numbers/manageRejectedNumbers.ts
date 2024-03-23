import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getNumberToReject, updateNumberById } from "../../repository/number/numbersService";
import { sendToRejected } from "../../repository/admin/adminService";
import SendRejecteMessage from '../../chatbot/sendRejecteMessage';

const manageRejectedNumbers = async (req: Request, res: Response) => {
    try {
        const reservedNumbers = await getNumberToReject();
        if (!reservedNumbers.length) return res.status(200).send({ message: "No reserved numbers found" });

        await Promise.all(
            reservedNumbers.map(async ({ id, num, phone, name }) => {
                try {
                    const sendRejected = await sendToRejected({ num: num!, name: name!, phone: phone!, creation_date: new Date() });
                    if (!sendRejected) throw new ErrorHandler("ERROR_SENDING_TO_REJECTED", 400);
                    await updateNumberById(id, {
                        isReserved: false,
                        payment_status: 'rejected',
                        update_date: new Date(),
                    });
                } catch (error) {
                    throw new ErrorHandler("ERROR_UPDATING_TO_REJECTED", 400);
                }
            })
        );

        const phones = [...new Set(reservedNumbers.map((num) => num.phone))];
        if (phones.length > 0)
            phones.map(phone => SendRejecteMessage(phone!))

        return res.status(200).send({ message: "success" });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_MANAGING_NUMBER";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default manageRejectedNumbers;
