import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
const cancleSale = async (req, res) => {
    const saleId = req.params.id;
    const sale = await prisma.sale.findUnique({
        where: {
            id: +saleId,
            userId: req.userId,
        }
    });
    if (!sale) {
        throw new HttpExeception("Sale not found", 404, Exceptions.NOT_FOUND);
    }
    if (sale.paymentStatus !== "PENDING") {
        throw new HttpExeception("Can not cancle a confirmed order", 400, Exceptions.NOT_OK);
    }
    await prisma.sale.delete({
        where: {
            id: sale.id,
        }
    });
    res.status(200).json({
        ok: true,
        msg: "Order cancled successfuly"
    });
};
export default cancleSale;
