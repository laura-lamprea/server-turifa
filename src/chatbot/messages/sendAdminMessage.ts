import ErrorHandler from "../../utils/errorHandler";
import SendMessage from '../sendMessage';

const SendAdminMessage = async (phone: string) => {
    try {
        if (!phone) throw new ErrorHandler("ERROR_PHONE_REQUIRED", 400);
        const message = `📬🔔¡Un nuevo pago!💰
            \n👋 ¡Hola! 🤩 Somos *TuRifa* 🍀
            \n👀 Se ha registrado un nuevo pago. Verifícalo en el siguiente enlace: ${process.env.URL_MANAGEMENT}`;
        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendAdminMessage;
