import validate from "../../../utils/validation.js";
import { updateCarMainSchema } from "../../../validation/car.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import prisma from "../../../services/db/prismaClient.js";
const updateCarMain = async (req, res) => {
    const validatedData = validate(req.body, updateCarMainSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const carId = req.params.id;
    await prisma.carModel.update({
        where: {
            id: carId,
        },
        data: {
            ...validatedData
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Car updated successfully"
    });
};
export default updateCarMain;
