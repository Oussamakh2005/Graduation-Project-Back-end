import prisma from "../../../services/prismaClient.js";
const getCar = async (req, res) => {
    const carId = req.body.id;
    try {
        const car = await prisma.car.findMany({
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
        res.status(200).json({
            ok: true,
            data: car
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
};
export default getCar;
//# sourceMappingURL=getCar.js.map