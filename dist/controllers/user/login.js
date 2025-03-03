import prisma from '../../services/prismaClient.js';
import compareHash from '../../utils/compareHash.js';
import { signJwt } from '../../utils/signJwt.js';
import sendEmail from '../../utils/sendEmail.js';
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    if (!user) {
        res.status(404).json({
            ok: false,
            message: 'Invalid email or password'
        });
    }
    else {
        if (!user.isVerified) {
            const token = signJwt({ email: user.email }, 1000 * 60 * 60 * 24);
            const isSend = sendEmail(user.email, `<a href="http://localhost:5000/api/user/verify?token=${token}">Click here to verify your email</a>`);
            if (await isSend) {
                res.status(200).json({
                    ok: false,
                    message: "User not verified check your email to verify"
                });
            }
            else {
                res.status(500).json({
                    ok: false,
                    message: "User not verified failed to send email try later"
                });
            }
        }
        else {
            if (await compareHash(password, user.password)) {
                const token = signJwt({ id: user.id, role: user.role }, 1000 * 60 * 60 * 24 * 10);
                res.status(200).json({
                    ok: true,
                    token
                });
            }
            else {
                res.status(400).json({
                    ok: false,
                    message: 'Invalid email or password'
                });
            }
        }
    }
};
export default login;
//# sourceMappingURL=login.js.map