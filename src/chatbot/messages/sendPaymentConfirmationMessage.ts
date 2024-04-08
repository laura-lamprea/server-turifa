import ErrorHandler from "../../utils/errorHandler";
import SendMessage from '../sendMessage';

const SendPaymentConfirmationMessage = async (phone: string) => {
    try {
        const message = `📥¡ *Captura Recibida* !✔️
            \n👋 ¡Hola! 🤩 Somos *TuRifa* 🍀
            \n📸 ¡Hemos recibido tu captura de pantalla del comprobante de pago!
            \n🔍 Estamos verificando la información y te confirmaremos en un plazo máximo de *24 horas* ⏳ si tu pago ha sido correctamente procesado. ✅
            \n🎟️🔍✨ Mientras tanto, puedes consultar el estado de tu ticket en cualquier momento a través del siguiente enlace: ${process.env.URL_MYNUMBERS}
            \nSi tienes alguna pregunta, no dudes en contactarnos a través de WhatsApp. 💬
            \n¡Gracias por tu paciencia y por confiar en *TuRifa* ❤️ 
            \n¡Buena suerte! 🍀`;

        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendPaymentConfirmationMessage;
