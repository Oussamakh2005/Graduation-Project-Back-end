import prisma from "../../services/db/prismaClient.js";
export const getInquiries = async (req, res) => {
    const inquiries = await prisma.inquiry.findMany({
        where: {
            answered: false,
        }
    });
    res.status(201).json({
        ok: true,
        data: inquiries,
    });
};
