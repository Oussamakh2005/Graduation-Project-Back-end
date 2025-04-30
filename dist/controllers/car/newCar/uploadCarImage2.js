import upload from "../../../services/upload/uploadFile.js";
import prisma from "../../../services/db/prismaClient.js";
import Exceptions from "../../../utils/Exceptions.js";
import HttpExeception from "../../../utils/HttpExeception.js";
const uploadCarImages2 = async (req, res) => {
    console.log(req.files);
    if (!req.file) {
        throw new HttpExeception("No image uploaded", 422, Exceptions.INVALID_DATA);
    }
    const url = await upload(req.file);
    if (!url) {
        throw new HttpExeception("Failed to upload image", 500, Exceptions.INTERNAL_ERROR);
    }
    await prisma.carModel.update({
        where: {
            id: req.params.id,
        },
        data: {
            mainImage: url,
            availability: true,
            infoComplete: true
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Image uploaded successfully",
        data: {
            id: req.params.id
        }
    });
};
export default uploadCarImages2;
