import { verifyJWT } from '../../../utils/verifyJWT.js';
import prisma from '../../../services/db/prismaClient.js';
import HttpExeception from '../../../utils/HttpExeception.js';
import Exceptions from '../../../utils/Exceptions.js';
const verifyUser = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        throw new HttpExeception("Invalid verification link", 422, Exceptions.INVALID_DATA);
    }
    const payload = verifyJWT(token);
    if (!payload) {
        throw new HttpExeception("Invalid verification token", 422, Exceptions.INVALID_DATA);
    }
    await prisma.user.update({
        where: {
            email: payload.email,
        },
        data: { isVerified: true }
    });
    res.status(200).json({
        ok: true,
        message: "User verified successfully"
    });
};
export default verifyUser;
