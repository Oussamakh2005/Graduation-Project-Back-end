import prisma from "../../services/db/prismaClient.js";
const salesHighlights = async (req, res) => {
    const [payedCars, diliverdCars, paymentAggregate] = await Promise.all([
        await prisma.sale.count({
            where: {
                paymentStatus: 'COMPLETED'
            }
        }),
        await prisma.sale.count({
            where: {
                pickupStatus: 'PICKED_UP'
            }
        }),
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
            payedCars,
            diliverdCars,
            totalRevenu
        }
    });
};
export default salesHighlights;
