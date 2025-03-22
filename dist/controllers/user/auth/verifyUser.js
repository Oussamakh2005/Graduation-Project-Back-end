import { verifyJWT } from '../../../utils/verifyJWT.js';
import prisma from '../../../services/prismaClient.js';
const verifyUser = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(400).json({
            ok: false,
            message: "Invalid token"
        });
    }
    else {
        const payload = verifyJWT(token);
        if (!payload) {
            res.status(400).json({
                ok: false,
                message: "Invalid token"
            });
        }
        else {
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
        }
    }
};
export default verifyUser;
//# sourceMappingURL=verifyUser.js.map