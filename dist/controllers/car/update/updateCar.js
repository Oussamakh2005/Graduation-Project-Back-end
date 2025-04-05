import prisma from "../../../services/db/prismaClient.js";
import validate from "../../../utils/validation.js";
import { updateCarSchema } from "../../../validation/car.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const updateCar = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateCarSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.carModel.update({
        where: {
            id: id
        },
        data: {
            ...validatedData
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Car updated successfully",
    });
};
export default updateCar;
