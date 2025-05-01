import prisma from "../../services/db/prismaClient.js";
const adminHighlights = async (req, res) => {
    const [totalCars, totalUsers, paymentAggregate] = await Promise.all([
        await prisma.carModel.count(),
        await prisma.user.count(),
        await prisma.payment.aggregate({
            _sum: {
                paymentAmount: true
            }
        }),
    ]);
    const totalRevenu = paymentAggregate._sum.paymentAmount || 0;
    res.status(200).json({
        ok: true,
        data: {
            totalUsers,
            totalCars,
            totalRevenu
        }
    });
};
export default adminHighlights;
