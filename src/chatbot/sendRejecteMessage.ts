import ErrorHandler from "../utils/errorHandler";
import SendMessage from './sendMessage';

const SendRejecteMessage = async (phone: string) => {
    try {
        if (!phone) throw new ErrorHandler("ERROR_PHONE_REQUIRED", 400);
        const message = `👋 ¡Hola! Somos *TuRifa* 🍀
            \n🚨 Lamentamos informarte que debido a la falta de confirmación de pago, tus números reservados han sido cancelados ❌ y están nuevamente disponibles para ser reservados por alguien más. 😔
            \n💡 Te recordamos que es importante realizar el pago dentro del plazo establecido para asegurar tu participación.
            \n➡️ Si aún te interesa participar, te invitamos a participar en: ${process.env.URL_DASHBOARD}
            \nAgradecemos tu comprensión y esperamos verte participando nuevamente. 🍀`;
        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SENDING_MESSAGE", 400);
    }
};

export default SendRejecteMessage;
