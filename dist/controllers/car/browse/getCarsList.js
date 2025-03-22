import prisma from "../../../services/prismaClient.js";
const getCarsList = async (req, res) => {
    const skip = req.query.skip ? +req.query.skip : 1;
    try {
        const cars = await prisma.car.findMany({
            where: {
                availability: true,
            },
            select: {
                id: true,
                model: true,
                price: true,
                discount: true,
                images: true
            },
            skip: (5 * (skip - 1)),
            take: 5,
        });
        if (skip === 1) {
            const pagination = await prisma.car.count({
                where: {
                    availability: true
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
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
};
export default getCarsList;
//# sourceMappingURL=getCarsList.js.map