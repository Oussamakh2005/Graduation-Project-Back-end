import validate from "../../../utils/validation.js";
import { engineSchema } from "../../../validation/car.js";
import prisma from "../../../services/prismaClient.js";
const setEngine = async (req, res) => {
    const validatedData = validate(req.body, engineSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data"
        });
    }
    else {
        try {
            await prisma.engine.create({
                data: {
                    ...validatedData,
                }
            });
            res.status(201).json({
                ok: true,
                msg: "Engine created successfully",
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
};
export default setEngine;
//# sourceMappingURL=engine.js.map