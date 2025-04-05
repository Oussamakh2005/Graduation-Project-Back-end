import upload from "../../../services/upload/uploadFile.js";
import prisma from "../../../services/db/prismaClient.js";
import Exceptions from "../../../utils/Exceptions.js";
import HttpExeception from "../../../utils/HttpExeception.js";
const uploadCarImages = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        throw new HttpExeception("No images uploaded", 422, Exceptions.INVALID_DATA);
    }
    const imagesURL = [];
    let mainImageUrl = "";
    const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    for (const file of filesArray) {
        const url = await upload(file);
        if (!url) {
            continue;
        }
        if (file.fieldname === "main") {
            mainImageUrl = url;
        }
        else {
            imagesURL.push(url);
        }
    }
    await prisma.carModel.update({
        where: {
            id: req.params.id,
        },
        data: {
            mainImage: mainImageUrl,
            images: imagesURL,
            availability: true,
            infoComplete: true
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Images uploaded successfully"
    });
};
export default uploadCarImages;
