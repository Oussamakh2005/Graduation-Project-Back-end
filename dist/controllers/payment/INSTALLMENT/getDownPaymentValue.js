import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const getDownPaymentValue = async (req, res) => {
    const slaeId = req.params.saleId;
    const sale = await prisma.sale.findUnique({
        where: {
            id: slaeId,
            paymentMethod: "INSTALLMENT",
        },
        select: {
            salePrice: true
        }
    });
    if (!sale) {
        throw new HttpExeception("Sale not found", 404, Exceptions.NOT_FOUND);
    }
    const downPaymentValue = Number(sale.salePrice) * 0.2;
    res.status(200).json({
        ok: true,
        data: downPaymentValue
    });
};
export default getDownPaymentValue;
