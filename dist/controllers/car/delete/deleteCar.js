import prisma from "../../../services/prismaClient.js";
const deleteCar = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.car.delete({
            where: {
                id: id
            }
        });
        await prisma.engine.deleteMany({
            where: {
                carId: id
            }
        });
        res.status(200).json({
            ok: true,
            msg: "Car deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong",
        });
    }
};
export default deleteCar;
//# sourceMappingURL=deleteCar.js.map