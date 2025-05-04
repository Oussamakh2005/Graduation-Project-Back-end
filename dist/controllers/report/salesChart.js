import prisma from "../../services/db/prismaClient.js";
const salesChart = async (req, res) => {
    let [from1To2, from3To4, from5To6, from7To8, from9To10, from11To12] = await Promise.all([
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-01-01",
                    lte: "2025-02-29",
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-03-01",
                    lte: "2025-04-30",
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-05-01",
                    lte: "2025-06-30",
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-07-01",
                    lte: "2025-08-31",
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-09-01",
                    lte: "2025-10-31",
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: "2025-11-01",
                    lte: "2025-12-31",
                }
            },
        }),
    ]);
    res.status(200).json({
        ok: true,
        data: {
            janFeb: from1To2,
            marApr: from3To4,
            mayJun: from5To6,
            julAug: from7To8,
            sepOct: from9To10,
            novDec: from11To12
        }
    });
};
export default salesChart;
