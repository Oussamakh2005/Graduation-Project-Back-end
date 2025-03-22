import validate from "../../../utils/validation.js";
import { initializeCarSchema } from "../../../validation/car.js";
import prisma from "../../../services/prismaClient.js";
const initializeCar = async (req, res) => {
    const validatedData = validate(req.body, initializeCarSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data"
        });
    }
    else {
        try {
            const car = await prisma.car.create({
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
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
    ;
};
export default initializeCar;
//# sourceMappingURL=initialize.js.map