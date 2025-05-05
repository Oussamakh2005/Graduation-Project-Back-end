import prisma from "../../services/db/prismaClient.js";
const clientHightlights = async (req, res) => {
    const [totalSales, completedSales, pendingSales] = await Promise.all([
        await prisma.sale.count({
            where: {
                userId: req.userId,
            }
        }),
        await prisma.sale.count({
            where: {
                userId: req.userId,
                paymentStatus: "COMPLETED"
            }
        }),
        await prisma.sale.count({
            where: {
                userId: req.userId,
                paymentStatus: "PENDING"
            }
        })
    ]);
    res.status(200).json({
        ok: true,
        data: {
            totalSales,
            completedSales,
            pendingSales
        }
    });
};
export default clientHightlights;
