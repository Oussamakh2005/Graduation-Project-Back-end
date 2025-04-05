import prisma from "../../../services/db/prismaClient.js";
const getIncompletedInfoCars = async (req, res) => {
    const cars = await prisma.carModel.findMany({
        where: {
            infoComplete: false,
        }
    });
    res.status(200).json({
        ok: true,
        data: cars
    });
};
export default getIncompletedInfoCars;
