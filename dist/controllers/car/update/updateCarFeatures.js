import Exceptions from "../../../utils/Exceptions.js";
import validate from "../../../utils/validation.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import prisma from "../../../services/db/prismaClient.js";
import { updateCarFeaturesSchema } from "../../../validation/car.js";
const updateCarFeatures = async (req, res) => {
    const validatedData = validate(req.body, updateCarFeaturesSchema);
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
export default updateCarFeatures;
