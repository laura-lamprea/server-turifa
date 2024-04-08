import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { updateNumberById, getMyNumbers, validateIds } from "../../repository/number/numbersService";
import SendBookingMessage from '../../chatbot/messages/sendBookingMessage';

const reserveNumber = async (req: Request, res: Response) => {
    try {
        const { ids, data } = req.body;
        const areAllIdsValid = await validateIds(ids);
        if (!areAllIdsValid)
            throw new ErrorHandler("One or more IDs are invalid (do not exist) or are reserved", 400);
        const { phone } = data;

        const myNumbers = await getMyNumbers(phone);
        if (ids.length > 10 || (myNumbers.pending?.length + myNumbers.approved?.length + ids.length) > 10) {
            throw new ErrorHandler("You can't reserve more than 10 numbers with the same phone number", 400);
        }

        const updatedNumbers = await Promise.all(
            ids.map((id: string) => updateNumberById(id, {
                ...data,
                isReserved: true,
                payment_status: 'pending',
                creation_date: new Date(),
            }))
        );

        if (!updatedNumbers) 
            throw new ErrorHandler("ERROR_CANNOT_RESERVING_NUMBERS", 400);
        
        const sendMessageResponse  = await SendBookingMessage(phone, updatedNumbers)
        if (!sendMessageResponse ) 
            throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
        
        return res.status(200).send({ message: "success", data: updatedNumbers });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_RESERVING_NUMBERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default reserveNumber;
