import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
export const getInquiry = async (req, res) => {
    const id = req.params.id;
    const inquiry = await prisma.inquiry.findUnique({
        where: {
            id: id,
        },
        select: {
            message: true,
        }
    });
    if (!inquiry) {
        throw new HttpExeception("Inquiry not found", 404, Exceptions.NOT_FOUND);
    }
    res.status(201).json({
        ok: true,
        data: inquiry,
    });
};
