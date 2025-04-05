import prisma from "../../../services/db/prismaClient.js";
import validate from "../../../utils/validation.js";
import { updateEngineSchema } from "../../../validation/car.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const updateEngine = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateEngineSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.engine.update({
        where: {
            id: id
        },
        data: {
            ...validatedData
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Engine updated successfully",
    });
};
export default updateEngine;
