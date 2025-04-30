import { verifyJWT } from '../../../utils/verifyJWT.js';
import prisma from '../../../services/db/prismaClient.js';
import { CLIENT_URI } from '../../../env.js';
const verifyUser = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.redirect(`${CLIENT_URI}/main/faild_to_verify.html`);
    }
    else {
        const payload = verifyJWT(token);
        if (!payload) {
            res.redirect(`${CLIENT_URI}/main/faild_to_verify.html`);
        }
        else {
            await prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: { isVerified: true }
            });
            res.redirect(`${CLIENT_URI}/main/login.html`);
        }
    }
};
export default verifyUser;
