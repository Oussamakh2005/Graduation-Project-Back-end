import prisma from "../../services/db/prismaClient.js";
const getSalesList = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * 10;
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
        },
        skip: skip,
        take: 10
    });
    if (page === 1) {
        const pagination = await prisma.sale.count();
        res.status(200).json({
            ok: true,
            data: sales,
            pagination: Math.ceil(pagination / 5),
        });
    }
    else {
        res.status(200).json({
            ok: true,
            data: sales,
        });
    }
};
export default getSalesList;
