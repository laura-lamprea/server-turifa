import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getNumberReserved } from "../../repository/number/numbersService";

const getTotal = async (req: Request, res: Response) => {
    try {
        const { ticketValue } = req.query;
        if (!ticketValue) throw new ErrorHandler("ERROR_NO_TICKET_VALUE", 400);
        const numbersPaid = await getNumberReserved();
        const totalCollected = numbersPaid.length * Number(ticketValue);
        return res.status(200).send({ message: "success", data: { numberTickets: numbersPaid.length, totalCollected } });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_GETTING_TOTAL_COLLECTED";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getTotal;
