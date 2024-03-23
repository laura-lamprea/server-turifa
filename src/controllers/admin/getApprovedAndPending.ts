import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getAllReservedNumbers } from "../../repository/number/numbersService";

const getApprovedAndPending = async (req: Request, res: Response) => {
    try {
        const getAllReserved = await getAllReservedNumbers();
        return res.status(200).send({ message: "success", data: getAllReserved });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_ALL_NUMBERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getApprovedAndPending;
