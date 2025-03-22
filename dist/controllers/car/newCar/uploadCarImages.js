import upload from "../../../utils/uploadFile.js";
import prisma from "../../../services/prismaClient.js";
const uploadCarImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            res.status(400).json({
                ok: false,
                msg: 'No images uploaded'
            });
        }
        else {
            const imagesURL = [];
            const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
            for (const file of filesArray) {
                const url = await upload(file);
                if (!url) {
                    continue;
                }
                imagesURL.push(url);
            }
            await prisma.car.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    images: imagesURL,
                    availability: true,
                }
            });
            res.status(201).json({
                ok: true,
                msg: "Images uploaded successfully"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
};
export default uploadCarImages;
//# sourceMappingURL=uploadCarImages.js.map