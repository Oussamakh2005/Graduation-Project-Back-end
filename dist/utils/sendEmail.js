import { APP_EMAIL } from "../env.js";
import resend from "../services/resendClient.js";
import createVerificationEmailPage from "./createVerficationEmailPage.js";
const sendEmail = async (receiver, link) => {
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
            console.error("Error sending email:", error);
            return false;
        }
        console.log("Email sent successfully:", data);
        return true;
    }
    catch (err) {
        console.error("Unexpected error:", err);
        return false;
    }
};
export default sendEmail;
//# sourceMappingURL=sendEmail.js.map