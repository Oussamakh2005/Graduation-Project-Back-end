import { APP_EMAIL } from "../../env.js";
import resend from "./resendClient.js";
const sendNotificaionEmail = async (receiver, message) => {
    try {
        const { data, error } = await resend.emails.send({
            from: APP_EMAIL,
            to: [receiver],
            subject: "Notificaion",
            text: message,
        });
        if (error) {
            console.log(error);
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
export default sendNotificaionEmail;
