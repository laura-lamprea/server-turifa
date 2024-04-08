import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import * as cheerio from 'cheerio';
import axios from 'axios';
import { getWinner } from '../../repository/admin/adminService';
import SendWinnerMessage from '../../chatbot/messages/sendWinnerMessage';

const scrapeWebsite = async (req: Request, res: Response) => {
    try {
        const { date, withMessage } = req.query;
        if (!date) 
            throw new ErrorHandler("ERROR_NO_DATE", 404);

        const response = await axios.get(process.env.URL_LOTERY || "");
        const html = response.data;
        const $ = cheerio.load(html);
        const $selected = $('.date')
        const dateFound = $selected.text().trim();
        const commaIndex = dateFound.indexOf(",")

        if (commaIndex === -1)
            throw new ErrorHandler("ERROR_DATE_NOT_FOUND", 404);

        const dateFaffle = dateFound.slice(commaIndex + 1).trim();        
        if (dateFaffle !== date)
            return res.status(200).send({ message: "ERROR_DATE_NOT_AVAILABLE", data: [] });

        const results: string[] = [];
        $('.rounded').each((index, element) => {
            const text = $(element).text().trim();
            results.push(text);
        });

        if (withMessage !== undefined && withMessage.toString().toLowerCase() === 'true' && results.length > 0) {
            const formattedResults = results.slice(-2).join('');
            const winner = await getWinner(formattedResults);
            if (winner) {
            const { phone, name } = winner;
            const sendMessageResponse = await SendWinnerMessage(phone!, name!);
            if (!sendMessageResponse)
                throw new ErrorHandler("CANNOT_SEND_MESSAGE", 404);
            return res.status(200).send({ message: "success" });
            } else
            throw new ErrorHandler("ERROR_NO_WINNER_FOUND", 404);
        }

        return res.status(200).send({ message: "success", data: results});
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_WINNER";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default scrapeWebsite;
