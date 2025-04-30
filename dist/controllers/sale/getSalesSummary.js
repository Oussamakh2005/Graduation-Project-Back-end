import prisma from "../../services/db/prismaClient.js";
const getSalesSummary = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const [totalSales, totalRevenue, pendingPayments, completedPayments, inProgressPayments] = await Promise.all([
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma.payment.aggregate({
            _sum: {
                paymentAmount: true
            }
        }),
        prisma.sale.count({
            where: {
                paymentStatus: 'PENDING',
                saleDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma.sale.count({
            where: {
                paymentStatus: 'COMPLETED',
                saleDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }),
        prisma.sale.count({
            where: {
                paymentStatus: "IN_PROGRESS",
                saleDate: {
                    gte: startDate,
                    lte: endDate,
                }
            }
        })
    ]);
    res.status(200).json({
        ok: true,
        data: {
            totalSales,
            totalRevenue: totalRevenue._sum.paymentAmount || 0,
            pendingPayments,
            completedPayments,
            inProgressPayments
        }
    });
};
export default getSalesSummary;
