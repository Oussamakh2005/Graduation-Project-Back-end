import prisma from "../../services/db/prismaClient.js";
const paymentHighlights = async (req, res) => {
    const [fullPayments, downPayments, paymentAggregate] = await Promise.all([
        await prisma.payment.count({
            where: {
                paymentType: "FULL_PAYMENT"
            }
        }),
        await prisma.payment.count({
            where: {
                paymentType: "DOWNPAYMENT"
            }
        }),
        await prisma.payment.aggregate({
            _sum: {
                paymentAmount: true
            }
        }),
    ]);
    const totalRevenu = paymentAggregate._sum.paymentAmount || 0;
    res.status(200).json({
        ok: true,
        data: {
            fullPayments,
            downPayments,
            totalRevenu
        }
    });
};
export default paymentHighlights;
