import prisma from "../../services/db/prismaClient.js";
const getUserSales = async (req, res) => {
    const sales = await prisma.sale.findMany({
        where: {
            userId: req.userId,
        },
        select: {
            id: true,
            carModel: {
                select: {
                    model: true
                }
            },
            salePrice: true,
            saleDate: true,
            paymentStatus: true,
            pickupStatus: true,
        }
    });
    res.status(200).json({
        ok: true,
        data: sales,
    });
};
export default getUserSales;
