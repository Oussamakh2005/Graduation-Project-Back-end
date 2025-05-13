import validate from "../../utils/validation.js";
import { newReviewSchema } from "../../validation/review.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
const newReview = async (req, res) => {
    const validatedData = validate(req.body, newReviewSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    const carId = req.params.id;
    await prisma.review.create({
        data: {
            carModelId: carId,
            userId: req.userId,
            comment: validatedData.comment,
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Comment added successfully"
    });
};
export default newReview;
