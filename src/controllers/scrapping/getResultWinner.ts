import { Request, Response } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import * as cheerio from 'cheerio';
import axios from 'axios';

const scrapeWebsite = async (req: Request, res: Response) => {
    try {
        const { date } = req.query;
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
        return res.status(200).send({ message: "success", data: results });
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
