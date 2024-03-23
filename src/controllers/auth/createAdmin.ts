import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
const bcrypt = require("bcryptjs");
import { getUserByEmail, createAdmins } from "../../repository/admin/adminService";

const createAdmin = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;        
        if (!email || !name || !password)
            throw new ErrorHandler("ERROR_EMPTY_FIELDS", 400);
        
        const checkIfExists = await getUserByEmail(email);
        if (checkIfExists)
            throw new ErrorHandler("ERROR_USER_ALREADY_EXISTS", 400);
        
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const adminCreated = await createAdmins({ email, name, password: hashedPassword });
        if (!adminCreated) throw new ErrorHandler("ERROR_CREATING_ADMIN", 400);
        return res.status(200).send({ message: "success", data: adminCreated });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_CREATING_ADMIN";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default createAdmin;
