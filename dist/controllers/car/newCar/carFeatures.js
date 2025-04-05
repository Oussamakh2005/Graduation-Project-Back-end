import validate from "../../../utils/validation.js";
import { carFeaturesSchema } from "../../../validation/car.js";
import prisma from "../../../services/db/prismaClient.js";
import Exceptions from "../../../utils/Exceptions.js";
import HttpExeception from "../../../utils/HttpExeception.js";
const setCarFeatures = async (req, res) => {
    const validatedData = validate(req.body, carFeaturesSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const car = await prisma.carModel.update({
        where: {
            id: req.params.id,
        },
        data: {
            ...validatedData
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Car updated successfully",
        data: {
            id: car.id
        }
    });
};
export default setCarFeatures;
