import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
const getInstallment = async (req, res) => {
    const id = req.params.id;
    const installment = await prisma.installment.findUnique({
        where: {
            id: id
        }
    });
    if (!installment) {
        throw new HttpExeception("No installment found", 400, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: installment
    });
};
export default getInstallment;
