import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getMyNumbers } from "../../repository/number/numbersService";

const getMyNumber = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        const numbers = await getMyNumbers(phone as string);
        return res.status(200).send({ message: "success", data: numbers });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_MY_NUMBERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getMyNumber;