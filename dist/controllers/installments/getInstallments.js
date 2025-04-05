import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
const getInstallments = async (req, res) => {
    const saleId = req.params.saleId;
    const installments = await prisma.installment.findMany({
        where: {
            plan: {
                saleId: saleId,
            }
        },
    });
    if (!installments) {
        throw new HttpExeception("No installments found", 400, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: installments
    });
};
export default getInstallments;
