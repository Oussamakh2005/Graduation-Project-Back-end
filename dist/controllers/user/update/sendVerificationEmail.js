import validate from "../../../utils/validation.js";
import { verificationEmailSchema } from "../../../validation/user.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import { signJwt } from "../../../utils/signJwt.js";
import prisma from "../../../services/db/prismaClient.js";
import { CLIENT_URI, RESET_PASSWORD_JWT } from "../../../env.js";
import sendVerificaionEmail from "../../../services/email/sendVerifucationEmail.js";
const sendPasswordVerificationEmail = async (req, res) => {
    const validatedData = validate(req.body, verificationEmailSchema);
    console.log(req.body);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const user = await prisma.user.findFirst({
        where: {
            email: validatedData.email
        },
        select: {
            id: true,
        }
    });
    if (!user) {
        throw new HttpExeception("User not found", 400, Exceptions.NOT_FOUND);
    }
    const resetPassword = await prisma.resetPassword.create({
        data: {
            userId: user.id
        },
        select: {
            id: true,
        }
    });
    const token = signJwt({ id: resetPassword.id }, 60 * 60, RESET_PASSWORD_JWT);
    const isSend = sendVerificaionEmail(validatedData.email, `${CLIENT_URI}/main/reset_your_password.html?token=${token}`);
    if (await isSend) {
        res.status(200).json({
            ok: true,
            msg: "User checked successfully check your email to get the link for reset your password",
        });
    }
    else {
        throw new HttpExeception("Faild to send email", 500, Exceptions.INTERNAL_ERROR);
    }
};
export default sendPasswordVerificationEmail;
