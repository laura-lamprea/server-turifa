import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import jwt from 'jsonwebtoken';
import { getUserByEmail } from "../../repository/admin/adminService";
const bcrypt = require("bcryptjs");
const secretKey = process.env.JWT_SECRET as string;

const loginWithCredentials = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new ErrorHandler("ERROR_EMPTY_FIELDS", 400);

        const user = await getUserByEmail(email);
        if (!user)
            throw new ErrorHandler("ERROR_INVALID_CREDENTIALS", 404);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandler("ERROR_INVALID_CREDENTIALS", 401)
        }

        const token = jwt.sign({ userId: user.id }, secretKey , { expiresIn: '1h' });
        return res.status(200).send({ message: "success", token });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_CREATING_ADMIN";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default loginWithCredentials;
