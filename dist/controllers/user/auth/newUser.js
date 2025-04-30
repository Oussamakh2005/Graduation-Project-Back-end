import validate from "../../../utils/validation.js";
import { newUserSchema } from "../../../validation/user.js";
import prisma from "../../../services/db/prismaClient.js";
import { signJwt } from "../../../utils/signJwt.js";
import sendVerificaionEmail from "../../../services/email/sendVerifucationEmail.js";
import hasher from "../../../utils/hasher.js";
import { APP_URI } from "../../../env.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const newUser = async (req, res) => {
    const validatedData = validate(req.body, newUserSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const user = await prisma.user.findUnique({
        where: {
            email: validatedData.email
        }
    });
    if (user) {
        throw new HttpExeception("Email already in used", 403, Exceptions.ALREADY_EXIST);
    }
    const newUser = await prisma.user.create({
        data: {
            ...validatedData,
            password: await hasher(validatedData.password),
        },
        select: {
            id: true
        }
    });
    const token = signJwt({ email: validatedData.email }, 60 * 60 * 24);
    const isSend = sendVerificaionEmail(validatedData.email, `${APP_URI}/api/user/verify?token=${token}`);
    setTimeout(async () => {
        const user = await prisma.user.findUnique({
            where: {
                id: newUser.id,
                isVerified: false,
            }
        });
        if (user) {
            await prisma.user.delete({
                where: {
                    id: newUser.id,
                }
            });
        }
    }, 1000 * 60 * 60 * 24);
    if (await isSend) {
        res.status(200).json({
            ok: true,
            msg: "User created successfully check your email to verify your account"
        });
    }
    else {
        throw new HttpExeception("Faild to send email", 500, Exceptions.INTERNAL_ERROR);
    }
};
export default newUser;
