import ErrorHandler from "../utils/errorHandler";
import SendMessage from './sendMessage';

const SendApprovedMessage = async (phone: string) => {
    try {
        const message = `💰✔️*¡Pago Aprobado!*💯
            \n👋 ¡Hola! 🤩 Somos *TuRifa* 🍀
            \n🎟️ ¡Tu pago ha sido *exitosamente verificado*! Ahora estás oficialmente participando en nuestra rifa! 🥳
            \n👀 Puedes consultar tu ticket a través del siguiente enlace: ${process.env.URL_MYNUMBERS}
            \n🍀 ¡Te deseamos toda la suerte del mundo! Que la fortuna esté de tu lado. 🍀`;
        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendApprovedMessage;
