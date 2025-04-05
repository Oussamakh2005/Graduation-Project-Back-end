import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const getCar = async (req, res) => {
    const carId = req.params.id;
    const car = await prisma.carModel.findUnique({
        where: {
            id: carId,
        },
        include: {
            engine: {
                select: {
                    type: true,
                    capacity: true,
                    horsepower: true,
                }
            }
        }
    });
    if (!car) {
        throw new HttpExeception("Car not found", 404, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: car
    });
};
export default getCar;
