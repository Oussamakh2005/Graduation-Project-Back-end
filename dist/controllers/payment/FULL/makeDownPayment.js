import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import prisma from "../../../services/db/prismaClient.js";
import dateFormatter from "../../../utils/dateFormatter.js";
import sendNotificaionEmail from "../../../services/email/sendNotificaionEmainl.js";
const makeDownPayment = async (req, res) => {
    const saleId = req.params.saleId;
    const sale = await prisma.sale.findUnique({
        where: {
            id: +saleId,
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
    if (sale.paymentStatus !== "PENDING") {
        throw new HttpExeception("Payment is already done", 400, Exceptions.ALREADY_EXIST);
    }
    return prisma.$transaction(async (tx) => {
        const downPaymentValue = Number(sale.salePrice) * 0.2;
        await tx.payment.create({
            data: {
                saleId: +saleId,
                paymentDate: dateFormatter(new Date()),
                paymentAmount: downPaymentValue,
                paymentType: "DOWNPAYMENT"
            }
        });
        await tx.sale.update({
            where: {
                id: +saleId,
            },
            data: {
                paymentStatus: "IN_PROGRESS"
            }
        });
        sendNotificaionEmail(sale.user.email, `عزيزي ${sale.user.firstName + " " + sale.user.lastName}،\n\nيسعدنا إبلاغك بأنه قد تم معالجة الدفعة المقدمة الخاصة بك بقيمة ${downPaymentValue} بنجاح.\n\nشكرًا لشرائك!\n\nمع أطيب التحيات،\nفريق Drivona`);
        res.status(200).json({
            ok: true,
            message: "Down payment done successfully"
        });
    });
};
export default makeDownPayment;
