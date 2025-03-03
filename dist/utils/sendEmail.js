import { APP_EMAIL } from "../env.js";
import resend from "../services/resendClient.js";
const sendEmail = async (receiver, content) => {
    const { data, error } = await resend.emails.send({
        from: APP_EMAIL,
        to: receiver,
        subject: "account verification",
        text: "account verification",
        html: content
    });
    if (error) {
        console.log(error);
        return false;
    }
    console.log(data);
    return true;
};
export default sendEmail;
//# sourceMappingURL=sendEmail.js.map