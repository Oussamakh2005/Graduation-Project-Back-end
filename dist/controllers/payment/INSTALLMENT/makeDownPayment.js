import validate from "../../../utils/validation.js";
import { downPaymentSchema } from "../../../validation/payment.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import prisma from "../../../services/db/prismaClient.js";
import dateFormatter from "../../../utils/dateFormatter.js";
import { Decimal } from "@prisma/client/runtime/library";
import { INTEREST_RATE } from "../../../env.js";
import sendNotificaionEmail from "../../../services/email/sendNotificaionEmainl.js";
const makeDownPayment = async (req, res) => {
    const saleId = req.params.saleId;
    const validatedData = validate(req.body, downPaymentSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid Data", 422, Exceptions.INVALID_DATA);
    }
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
    if (sale.paymentMethod !== "INSTALLMENT") {
        throw new HttpExeception("Sale is not in installment", 400, Exceptions.NOT_OK);
    }
    if (sale.paymentStatus !== "PENDING") {
        throw new HttpExeception("Down payment is already done", 400, Exceptions.ALREADY_EXIST);
    }
    return prisma.$transaction(async (tx) => {
        const downPaymentValue = Number(sale.salePrice) * 0.2;
        await tx.payment.create({
            data: {
                saleId: saleId,
                paymentDate: dateFormatter(new Date()),
                paymentAmount: new Decimal(downPaymentValue),
                paymentType: "DOWNPAYMENT"
            }
        });
        await tx.sale.update({
            where: {
                id: saleId,
            },
            data: {
                paymentStatus: "IN_PROGRESS",
            }
        });
        const installmentValue = new Decimal((Number(sale.salePrice) - downPaymentValue) / validatedData.installmentsNumber);
        const plan = await tx.installmentPlan.create({
            data: {
                saleId: saleId,
                installmentsNumber: validatedData.installmentsNumber,
                remainingInstallments: validatedData.installmentsNumber,
                installmentValue: installmentValue,
                interestRate: INTEREST_RATE,
                downPayment: new Decimal(downPaymentValue),
            }
        });
        const today = new Date();
        for (let i = 1; i <= validatedData.installmentsNumber; i++) {
            let dueDate = new Date(today);
            await tx.installment.create({
                data: {
                    planId: plan.id,
                    dueDate: dateFormatter(new Date(dueDate.setMonth(dueDate.getMonth() + i))),
                    amount: installmentValue,
                }
            });
        }
        sendNotificaionEmail(sale.user.email, `Dear ${sale.user.firstName + " " + sale.user.lastName},\n\nWe are pleased to inform you that your down payment of ${downPaymentValue} has been successfully processed.\n\nThank you for your purchase!\n\nBest regards,\nDrivona Team`);
        res.status(201).json({
            ok: true,
            message: `Down payment of ${downPaymentValue} is done successfully
            the installment plan is create successfully
            the installment is scheduled successfully`,
        });
    });
};
export default makeDownPayment;
