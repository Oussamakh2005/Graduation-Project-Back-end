import { verifyJWT } from "../utils/verifyJWT.js";
import prisma from "../services/prismaClient.js";
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            ok: false,
            message: "Unauthorized"
        });
    }
    else {
        const payload = verifyJWT(token);
        if (payload) {
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id
                }
            });
            if (user) {
                next();
            }
            else {
                res.status(401).json({
                    ok: false,
                    message: "Unauthorized"
                });
            }
        }
        else {
            res.status(401).json({
                ok: false,
                message: "Unauthorized"
            });
        }
    }
};
export default isAuthenticated;
//# sourceMappingURL=authenticated.js.map