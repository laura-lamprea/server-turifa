import ErrorHandler from "../utils/errorHandler";
import { BaileysProvider } from "@bot-whatsapp/provider-baileys"
import { createProvider } from '@bot-whatsapp/bot'
const adapterProvider = createProvider(BaileysProvider)
adapterProvider.saveCredsGlobal
adapterProvider.on('connection', (stream) => {
    console.log('someone connected!');
});
adapterProvider.on('disconnection', (stream) => {
    console.log('someone disconnected!');
});
const SendMessage = async (phone: string, message: any) => {
    try {
        if (!phone || !message)
            throw new ErrorHandler("Fields are required", 400);
        const result = await adapterProvider.sendText(phone, message);
        adapterProvider.emit('connection', 'stream')
        return result.status;
    } catch (error) {
        adapterProvider.emit('disconnection', 'stream')
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendMessage;

