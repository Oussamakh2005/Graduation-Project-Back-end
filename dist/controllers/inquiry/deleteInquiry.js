import prisma from "../../services/db/prismaClient.js";
export const deleteInquiry = async (req, res) => {
    const id = req.params.id;
    await prisma.inquiry.delete({
        where: {
            id: id,
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Inquiry deleted successfully",
    });
};
