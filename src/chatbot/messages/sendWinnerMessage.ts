import ErrorHandler from "../../utils/errorHandler";
import SendMessage from '../sendMessage';

const SendWinnerMessage = async (phone: string, name: string) => {
    try {
        const message = `🎉¡FELICIDADES, ${name}!🥳
            \n¡Eres el ganador de nuestro sorteo en *TuRifa*! 🏆 Prepárate para disfrutar de tu premio.
            \n📲 Te contactaremos pronto para gestionar tu premio. 🎁
            \n¡Gracias por participar en TuRifa! ❤️ ¡Esperamos que disfrutes tu premio! 🍀`;
        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendWinnerMessage;