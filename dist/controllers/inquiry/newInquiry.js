import validate from "../../utils/validation.js";
import { inquirySchema } from "../../validation/inquiry.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
export const newInquiry = async (req, res) => {
    const validatedData = validate(req.body, inquirySchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.inquiry.create({
        data: {
            fullName: validatedData.fullName,
            email: validatedData.email,
            message: validatedData.message
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Inquiry created successfully you will get a response soon on your email"
    });
};
