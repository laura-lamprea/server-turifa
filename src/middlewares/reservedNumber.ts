
import { Request, Response, NextFunction } from 'express'
const { body, validationResult } = require("express-validator");

const reservedNumberMidleware = [
    body("data.name")
        .notEmpty()
        .withMessage(`Name is required`)
        .isString()
        .withMessage(`Name must be a string`)
        .trim()
        .notEmpty()
        .withMessage(`Name cannot be empty`),
    body("data.phone")
        .notEmpty()
        .withMessage(`Phone is required`)
        .isString()
        .withMessage(`Phone must be a string`)
        .matches(/^(3\d{9})$/)
        .withMessage('Phone number must start with 3 and have 9 digits')
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone must be 10 digits long')
        // .customSanitizer((value: any) => value.replace(/\D/g, '')) 
        .trim()
        .notEmpty()
        .withMessage(`Phone cannot be empty`),
    body("ids")
        .notEmpty()
        .withMessage(`IDs are required`)
        .isArray()
        .withMessage(`IDs must be an array`)
        .notEmpty()
        .withMessage(`IDs cannot be empty`),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(400).send({ errors: error });
        }
    },
];

export default reservedNumberMidleware;