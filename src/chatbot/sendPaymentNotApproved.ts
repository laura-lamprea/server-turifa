import ErrorHandler from "../utils/errorHandler";
import SendMessage from './sendMessage';

const SendPaymentNotApproved = async (phone: string) => {
    try {
        if (!phone) throw new ErrorHandler("ERROR_PHONE_REQUIRED", 400);
        const message = `🚫*Pago Rechazado*🚫
            \n👋 ¡Hola! Lamentamos informarte que ha habido una irregularidad al verificar tu pago en *TuRifa*.
            \n🔍 Por motivos de seguridad, hemos rechazado la reserva asociada a tu número de teléfono. 📱
            \n🔄 Como resultado, el o los números que intentaste reservar ahora está disponibles para otra persona. 😔
            \n❓ Si crees que se trata de un error o necesitas más información, por favor no dudes en comunicarte con nosotros a través de WhatsApp. 💬
            \n🙏 Agradecemos tu comprensión y esperamos poder solucionar cualquier inconveniente que hayas experimentado. 🍀`;
        const result = await SendMessage(`57${phone}@c.us`, message);
        return result;
    } catch (error) {
        throw new ErrorHandler("ERROR_CANNOT_SEND_MESSAGE", 400);
    }
};

export default SendPaymentNotApproved;
