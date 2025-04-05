import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
const getSale = async (req, res) => {
    const saleId = req.params.saleId;
    const sale = await prisma.sale.findUnique({
        where: {
            id: saleId,
        },
    });
    if (!sale) {
        throw new HttpExeception("Sale not found", 404, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: sale,
    });
};
export default getSale;
