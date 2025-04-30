import prisma from "../../../services/db/prismaClient.js";
const authenticated = async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            id: req.userId,
        },
        select: {
            role: true,
        }
    });
    res.status(200).json({
        ok: true,
        message: "Authenticated",
        role: user?.role || "CLIENT",
    });
};
export default authenticated;
