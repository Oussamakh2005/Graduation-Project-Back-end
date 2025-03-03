import { createTransport } from "nodemailer";
import { APP_EMAIL, APP_EMAIL_PASSWORD } from "../env.js";
const transporter = createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: APP_EMAIL,
        pass: APP_EMAIL_PASSWORD,
    },
});
export default transporter;
//# sourceMappingURL=email.js.map