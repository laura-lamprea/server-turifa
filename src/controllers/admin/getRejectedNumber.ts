import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import { getAllRejected } from "../../repository/admin/adminService";


const getRejectedNumber = async (req: Request, res: Response) => {
    try {
        const rejectedNumbers = await getAllRejected();
        if (!rejectedNumbers) throw new ErrorHandler("ERROR_NO_REJECTED_NUMBERS", 400);
        return res.status(200).send({ message: "success", data: rejectedNumbers});
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_GETTING_REJECTED_NUMBERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getRejectedNumber;
