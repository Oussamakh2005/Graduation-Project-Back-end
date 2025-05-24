import prisma from "../../services/db/prismaClient.js";
const salesChart = async (req, res) => {
    const currentYear = new Date().getFullYear();
    let [from1To2, from3To4, from5To6, from7To8, from9To10, from11To12] = await Promise.all([
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-01-01`,
                    lte: `${currentYear}-02-29`,
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-03-01`,
                    lte: `${currentYear}-04-30`,
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-05-01`,
                    lte: `${currentYear}-06-30`,
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-07-01`,
                    lte: `${currentYear}-08-31`,
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-09-01`,
                    lte: `${currentYear}-10-31`,
                }
            },
        }),
        prisma.sale.count({
            where: {
                saleDate: {
                    gte: `${currentYear}-11-01`,
                    lte: `${currentYear}-12-31`,
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
