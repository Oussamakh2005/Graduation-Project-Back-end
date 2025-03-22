import validate from "../../utils/validation.js";
import { newCarSchema } from "../../validation/car.js";
import { v4 as uuidV4 } from "uuid";
import supabase from "../../services/supabaseClient.js";
import prisma from "../../services/prismaClient.js";
const newCar = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            res.status(400).json({
                ok: false,
                msg: 'No images uploaded'
            });
        }
        else {
            const validatedData = validate(req.body, newCarSchema);
            if (!validatedData) {
                res.status(400).json({
                    ok: false,
                    msg: "Invalid car data"
                });
            }
            else {
                const uploadedFiles = [];
                const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
                for (const file of filesArray) {
                    const filePath = `uploads/${uuidV4()}+_${file.originalname}`;
                    const { data, error } = await supabase.storage.from("cars_images").upload(filePath, file.buffer, { contentType: file.mimetype });
                    if (error) {
                        console.error('Error uploading file:', error.message);
                        continue;
                    }
                    const publicUrl = supabase.storage.from('cars_images').getPublicUrl(filePath).data.publicUrl;
                    uploadedFiles.push(publicUrl);
                }
                const car = await prisma.car.create({
                    data: {
                        model: validatedData.model,
                        year: validatedData.year,
                        colors: validatedData.colors,
                        type: validatedData.type,
                        transmission: validatedData.transmission,
                        driveType: validatedData.drive,
                        features: validatedData.features,
                        price: validatedData.price,
                        discount: validatedData.discount ?? 0,
                        images: uploadedFiles,
                    },
                    select: {
                        id: true
                    }
                });
                await prisma.engine.create({
                    data: {
                        type: validatedData.engine.type,
                        capacity: validatedData.engine.capacity,
                        horsepower: validatedData.engine.horsepower,
                        carId: car.id
                    }
                });
                res.status(201).json({
                    ok: true,
                    msg: "car added successfully"
                });
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
};
export default newCar;
//# sourceMappingURL=newCar.js.map