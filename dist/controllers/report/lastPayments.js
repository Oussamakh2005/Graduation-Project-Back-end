import prisma from "../../services/db/prismaClient.js";
const lastPayments = async (req, res) => {
    const payments = await prisma.payment.findMany({
        take: 10,
        orderBy: {
            paymentDate: "desc"
        },
        include: {
            sale: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            }
        }
    });
    res.status(200).json({
        ok: true,
        data: payments,
    });
};
export default lastPayments;
