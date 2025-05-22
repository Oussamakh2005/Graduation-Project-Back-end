import prisma from "../../services/db/prismaClient.js";
const getSalesList = async (req, res) => {
    const where = {
        paymentMethod: req.query.paymentMethod,
        paymentStatus: req.query.paymentStatus,
    };
    const sales = await prisma.sale.findMany({
        where: {
            paymentMethod: where.paymentMethod,
            paymentStatus: where.paymentStatus,
        },
        select: {
            id: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
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
export default getSalesList;
