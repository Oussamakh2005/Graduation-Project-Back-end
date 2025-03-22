import validate from "../../../utils/validation.js";
import { carFeaturesSchema } from "../../../validation/car.js";
import prisma from "../../../services/prismaClient.js";
const setCarFeatures = async (req, res) => {
    const validatedData = validate(req.body, carFeaturesSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data"
        });
    }
    else {
        try {
            const car = await prisma.car.update({
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
        }
        catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
};
export default setCarFeatures;
//# sourceMappingURL=carFeatures.js.map