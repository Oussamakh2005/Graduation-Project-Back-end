import prisma from "../../../services/db/prismaClient.js";
const deleteCar = async (req, res) => {
    const id = req.params.id;
    await prisma.carModel.delete({
        where: {
            id: id
        }
    });
    await prisma.engine.deleteMany({
        where: {
            carModelId: id
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Car deleted successfully",
    });
};
export default deleteCar;
