import { APP_EMAIL } from "../../env.js";
import resend from "./resendClient.js";
import createVerificationEmailPage from "../../utils/createVerficationEmailPage.js";
const sendVerificaionEmail = async (receiver, link) => {
    const html = createVerificationEmailPage(link);
    try {
        const { data, error } = await resend.emails.send({
            from: APP_EMAIL,
            to: [receiver],
            subject: "account verification",
            text: "account verification",
            html: html
        });
        if (error) {
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
export default sendVerificaionEmail;
