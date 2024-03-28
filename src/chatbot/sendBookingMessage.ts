import ErrorHandler from "../utils/errorHandler";
import SendMessage from './sendMessage';

export interface INumbers {
    num?: string;
    name?: string;
}

const SendBookingMessage = async (phone: string, updatedNumbers: INumbers[]) => {
    try {
        const name = updatedNumbers[0].name;
        const numbers = updatedNumbers.map(number => number.num).join(', ');
        const message = `👋 ¡Hola, ${name}!🎉 Somos *TuRifa* 🍀
            \n¡Excelentes noticias!🎉 Has reservado con éxito en *TuRifa*. Aquí está la información:
            \n🎟️ Números reservados: ${numbers}
            \n🔔 Recuerda que debes pagar en un máximo de *2 días* para asegurar tu participación.
            \n💰 Para realizar el pago, visita: ${process.env.URL_MYNUMBERS}
            \n➡️ Luego ingresa tu número de celular 📱 y sigue los pasos!
            \nSi tienes alguna pregunta, no dudes en contactarnos a través de WhatsApp. 💬
            \nGracias por confiar en nosotros ❤️ ¡Buena suerte! 🍀`;

        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendBookingMessage;
