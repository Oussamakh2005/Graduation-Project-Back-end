import validate from "../../../utils/validation.js";
import { engineSchema } from "../../../validation/car.js";
import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const setEngine = async (req, res) => {
    const validatedData = validate(req.body, engineSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.engine.create({
        data: {
            ...validatedData,
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Engine created successfully",
    });
};
export default setEngine;
