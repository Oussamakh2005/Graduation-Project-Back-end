import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import validate from "../../utils/validation.js";
import { inquiryResponseSchema } from "../../validation/inquiry.js";
import sendNotificaionEmail from "../../services/email/sendNotificaionEmainl.js";
export const responseInquiry = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, inquiryResponseSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const inquiry = await prisma.inquiry.findUnique({
        where: {
            id: id,
        },
        select: {
            email: true,
        }
    });
    if (!inquiry) {
        throw new HttpExeception("Inquiry not found", 404, Exceptions.NOT_FOUND);
    }
    const isSend = await sendNotificaionEmail(inquiry.email, validatedData.message);
    if (!isSend) {
        throw new HttpExeception("Email not sent", 500, Exceptions.INTERNAL_ERROR);
    }
    await prisma.inquiry.update({
        where: {
            id: id
        },
        data: {
            answered: true,
        }
    });
    res.status(200).json({
        ok: true,
        message: "Eamil sent successfully",
    });
};
