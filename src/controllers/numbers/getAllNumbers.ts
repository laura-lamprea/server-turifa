import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getNumbers } from "../../repository/number/numbersService";

const getAllNumbers = async (req: Request, res: Response) => {
    try {
        const data = await getNumbers();
        if (data.length === 0)
            throw new ErrorHandler("ERROR_NUMBERS_NOT_FOUND", 404);
        return res.status(200).send({ message: "success", data: data });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_ALL_NUMBERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getAllNumbers;
