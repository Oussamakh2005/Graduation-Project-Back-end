import prisma from '../../../services/db/prismaClient.js';
import compareHash from '../../../utils/compareHash.js';
import { signJwt } from '../../../utils/signJwt.js';
import sendVerificaionEmail from '../../../services/email/sendVerifucationEmail.js';
import HttpExeception from '../../../utils/HttpExeception.js';
import Exceptions from '../../../utils/Exceptions.js';
import { APP_URI } from '../../../env.js';
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    if (!user) {
        throw new HttpExeception("Invalid email or password", 422, Exceptions.INVALID_DATA);
    }
    if (!user.isVerified) {
        const token = signJwt({ email: user.email }, 1000 * 60 * 60 * 24);
        const isSend = sendVerificaionEmail(user.email, `${APP_URI}/api/user/verify?token=${token}`);
        if (await isSend) {
            throw new HttpExeception("User not verified check your email to verify your account", 200, Exceptions.OK);
        }
        else {
            throw new HttpExeception("User not verified failed to send email try again later", 500, Exceptions.INTERNAL_ERROR);
        }
    }
    if (await compareHash(password, user.password)) {
        const token = signJwt({ id: user.id, role: user.role }, 1000 * 60 * 60 * 24 * 10);
        res.status(200).json({
            ok: true,
            data: token,
            role: user.role
        });
    }
    else {
        throw new HttpExeception('Invalid email or password', 422, Exceptions.INVALID_DATA);
    }
};
export default login;
