import ErrorHandler from "../utils/errorHandler";
import { BaileysProvider } from "@bot-whatsapp/provider-baileys"
import { createProvider } from '@bot-whatsapp/bot'
const adapterProvider = createProvider(BaileysProvider)

const SendMessage = async (phone: string, message: any) => {
    try {
        if (!phone || !message)
            throw new ErrorHandler("Fields are required", 400);
        const result = await adapterProvider.sendText(phone, message);
        return result.status;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SENDING_MESSAGE", 400);
    }
};

export default SendMessage;
