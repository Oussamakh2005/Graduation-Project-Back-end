import prisma from "../../../services/db/prismaClient.js";
const getCarsList = async (req, res) => {
    const skip = req.query.skip ? +req.query.skip : 1;
    const cars = await prisma.carModel.findMany({
        where: {
            availability: true,
        },
        select: {
            id: true,
            model: true,
            price: true,
            discount: true,
            mainImage: true
        },
        skip: (5 * (skip - 1)),
        take: 5,
    });
    if (skip === 1) {
        const pagination = await prisma.carModel.count({
            where: {
                availability: true,
                infoComplete: true,
            }
        });
        res.status(200).json({
            ok: true,
            data: cars,
            pagination: Math.ceil(pagination / 5),
        });
    }
    else {
        res.status(200).json({
            ok: true,
            data: cars
        });
    }
};
export default getCarsList;
