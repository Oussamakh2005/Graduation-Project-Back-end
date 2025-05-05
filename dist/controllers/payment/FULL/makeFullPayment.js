import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import prisma from "../../../services/db/prismaClient.js";
import dateFormatter from "../../../utils/dateFormatter.js";
import sendNotificaionEmail from "../../../services/email/sendNotificaionEmainl.js";
const makeFullPayment = async (req, res) => {
    const saleId = req.params.saleId;
    const sale = await prisma.sale.findUnique({
        where: {
            id: saleId,
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        }
    });
    if (!sale) {
        throw new HttpExeception("Sale not found", 404, Exceptions.NOT_FOUND);
    }
    if (sale.paymentMethod !== "CASH") {
        throw new HttpExeception("Sale is not in full payment", 400, Exceptions.NOT_OK);
    }
    if (sale.paymentStatus !== "IN_PROGRESS") {
        if (sale.paymentStatus == "PENDING") {
            throw new HttpExeception("You have to pay down payment first", 400, Exceptions.NOT_OK);
        }
        throw new HttpExeception("Payment is already done", 400, Exceptions.ALREADY_EXIST);
    }
    return prisma.$transaction(async (tx) => {
        const paymentValue = Number(sale.salePrice) * 0.8;
        await tx.payment.create({
            data: {
                saleId: saleId,
                paymentDate: dateFormatter(new Date()),
                paymentAmount: paymentValue,
                paymentType: "FULL_PAYMENT"
            }
        });
        await tx.sale.update({
            where: {
                id: saleId,
            },
            data: {
                paymentStatus: "COMPLETED"
            }
        });
        sendNotificaionEmail(sale.user.email, `عزيزي ${sale.user.firstName + " " + sale.user.lastName}،\n\nيسعدنا إبلاغك بأنه قد تم معالجة الدفعة  التكميلية
 الخاصة بك بقيمة ${paymentValue} بنجاح.\n\nشكرًا لشرائك!\n\nمع أطيب التحيات،\nفريق Drivona`);
        res.status(200).json({
            ok: true,
            message: "Payment done successfully"
        });
    });
};
export default makeFullPayment;
