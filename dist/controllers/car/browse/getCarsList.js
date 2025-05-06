import prisma from "../../../services/db/prismaClient.js";
const getCarsList = async (req, res) => {
    const cars = await prisma.carModel.findMany({
        where: {
            availability: true,
        },
        select: {
            id: true,
            model: true,
            price: true,
            discount: true,
            mainImage: true,
            transmission: true,
            seats: true,
            year: true,
            availability: true,
            engine: {
                select: {
                    type: true,
                }
            }
        },
    });
    res.status(200).json({
        ok: true,
        data: cars
    });
};
export default getCarsList;
