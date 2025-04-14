import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
import dateFormatter from "../../../utils/dateFormatter.js";
import { Decimal } from "@prisma/client/runtime/library";
import sendNotificaionEmail from "../../../services/email/sendNotificaionEmainl.js";
const payForInstallment = async (req, res) => {
    const id = req.params.id;
    const installment = await prisma.installment.findUnique({
        where: {
            id: id,
        },
        include: {
            plan: {
                select: {
                    id: true,
                    sale: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                }
                            }
                        }
                    },
                    remainingInstallments: true,
                },
            }
        }
    });
    console.log(installment?.plan.sale.user.email);
    if (!installment) {
        throw new HttpExeception("No installment found", 404, Exceptions.NOT_FOUND);
    }
    if (installment.status === "PAID") {
        throw new HttpExeception("Installment already paid", 403, Exceptions.ALREADY_EXIST);
    }
    return prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
            data: {
                saleId: installment.plan.sale.id,
                paymentDate: dateFormatter(new Date()),
                paymentAmount: new Decimal(installment.amount),
                paymentType: "INSTALLMENT_PAYMENT"
            }
        });
        await tx.installment.update({
            where: {
                id: installment.id,
            },
            data: {
                status: "PAID",
                paymentId: payment.id
            }
        });
        const remainingInstallments = installment.plan.remainingInstallments - 1;
        if (remainingInstallments === 0) {
            await tx.installmentPlan.update({
                where: {
                    id: installment.planId,
                },
                data: {
                    remainingInstallments: remainingInstallments,
                    status: "COMPLETED"
                }
            });
            await tx.sale.update({
                where: {
                    id: installment.planId,
                },
                data: {
                    paymentStatus: "COMPLETED"
                }
            });
        }
        else {
            await tx.installmentPlan.update({
                where: {
                    id: installment.planId,
                },
                data: {
                    remainingInstallments: remainingInstallments,
                }
            });
        }
        sendNotificaionEmail(installment.plan.sale.user.email, `Dear ${installment.plan.sale.user.firstName + " " + installment.plan.sale.user.lastName},\n\nWe are pleased to inform you that your installment payment of ${installment.amount} has been successfully processed.\n\nThank you for your purchase!\n\nBest regards,\nDrivona Team`);
        res.status(201).json({
            ok: true,
            message: `Installment payment of ${installment.amount} is done successfully`
        });
    });
};
export default payForInstallment;
