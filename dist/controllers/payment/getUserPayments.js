import prisma from "../../services/db/prismaClient.js";
const getUserPayments = async (req, res) => {
    const payments = await prisma.payment.findMany({
        where: {
            sale: {
                userId: req.userId
            }
        }
    });
    res.status(200).json({
        ok: true,
        data: payments,
    });
};
export default getUserPayments;
