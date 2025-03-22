import prisma from "../../../services/prismaClient.js";
import validate from "../../../utils/validation.js";
import { updateEngineSchema } from "../../../validation/car.js";
const updateEngine = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateEngineSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    }
    else {
        try {
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
        }
        catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong",
            });
        }
    }
};
export default updateEngine;
//# sourceMappingURL=updateEngine.js.map