import validate from "../../../utils/validation.js";
import { updatePasswordSchema } from "../../../validation/user.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import prisma from "../../../services/db/prismaClient.js";
import hasher from "../../../utils/hasher.js";
const updateUserPassword = async (req, res) => {
    console.log(req.userId);
    const resetPassword = await prisma.resetPassword.findUnique({
        where: {
            id: req.userId,
            isValid: true,
        }
    });
    if (!resetPassword) {
        throw new HttpExeception("Invalid link", 422, Exceptions.INVALID_DATA);
    }
    const validatedData = validate(req.body, updatePasswordSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.user.update({
        where: {
            id: resetPassword.userId
        },
        data: {
            password: await hasher(validatedData.password)
        }
    });
    await prisma.resetPassword.update({
        where: {
            id: resetPassword.id
        },
        data: {
            isValid: false
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Password updated successfully"
    });
};
export default updateUserPassword;
