import prisma from "../../../services/prismaClient.js";
import validate from "../../../utils/validation.js";
import { updateCarSchema } from "../../../validation/car.js";
const updateCar = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateCarSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    }
    else {
        try {
            await prisma.car.update({
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
        }
        catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong",
            });
        }
    }
};
export default updateCar;
//# sourceMappingURL=updateCar.js.map