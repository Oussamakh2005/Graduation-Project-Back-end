import validate from "../../../utils/validation.js";
import { initializeCarSchema } from "../../../validation/car.js";
import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const initializeCar = async (req, res) => {
    const validatedData = validate(req.body, initializeCarSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const car = await prisma.carModel.create({
        data: {
            ...validatedData
        },
        select: {
            id: true
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Car created successfully",
        data: {
            id: car.id
        }
    });
};
export default initializeCar;
