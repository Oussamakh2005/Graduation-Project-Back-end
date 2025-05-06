import { verifyJWT } from "../utils/verifyJWT.js";
import prisma from "../services/db/prismaClient.js";
import HttpExeception from "../utils/HttpExeception.js";
import Exceptions from "../utils/Exceptions.js";
import { RESET_PASSWORD_JWT } from "../env.js";
const checkResetPasswordToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new HttpExeception("Unauthorized", 401, Exceptions.UNAUTHERIZED);
    }
    const payload = verifyJWT(token, RESET_PASSWORD_JWT);
    if (payload) {
        const resetPassword = await prisma.resetPassword.findUnique({
            where: {
                id: payload.id
            }
        });
        if (!resetPassword) {
            throw new HttpExeception("Unauthorized", 401, Exceptions.UNAUTHERIZED);
        }
        req.userId = resetPassword.id;
        next();
    }
    else {
        throw new HttpExeception("Unauthorized ", 401, Exceptions.UNAUTHERIZED);
    }
};
export default checkResetPasswordToken;
