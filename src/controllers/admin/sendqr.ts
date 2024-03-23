import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import path from 'path';

const sendqr = async (req: Request, res: Response) => {
    try {
        const { token } = req.headers;
        if (!token) return res.status(401).send({ message: 'Acceso no autorizado' });
        const imagePath = path.join(__dirname, '../../../bot.qr.png');
        if (!imagePath)
            throw new ErrorHandler("ERROR_NO_FOUND_QR", 400);
        res.sendFile(imagePath);
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_SEND_QR";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default sendqr;
