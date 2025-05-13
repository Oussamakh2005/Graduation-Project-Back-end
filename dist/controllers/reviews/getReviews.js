import prisma from "../../services/db/prismaClient.js";
const getReviews = async (req, res) => {
    const carId = req.params.id;
    const reviews = await prisma.review.findMany({
        where: {
            carModelId: carId,
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    res.status(200).json({
        ok: true,
        data: reviews,
    });
};
export default getReviews;
