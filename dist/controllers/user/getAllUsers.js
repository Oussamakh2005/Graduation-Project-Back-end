import prisma from "../../services/db/prismaClient.js";
const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    res.status(200).json({
        ok: true,
        data: users,
    });
};
export default getAllUsers;
