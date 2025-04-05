import validate from "../../utils/validation.js";
import { newSaleSchema } from "../../validation/sale.js";
import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import { INTEREST_RATE } from "../../env.js";
import dateFormatter from "../../utils/dateFormatter.js";
const newSale = async (req, res) => {
    const validatedData = validate(req.body, newSaleSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid Data", 400, Exceptions.INVALID_DATA);
    }
    const car = await prisma.carModel.findUnique({
        where: {
            id: req.params.carId,
            availability: true
        },
        select: {
            id: true,
            price: true,
            discount: true,
        }
    });
    if (!car) {
        throw new HttpExeception("Car not found or not available for sale", 404, Exceptions.NOT_FOUND);
    }
    return prisma.$transaction(async (tx) => {
        let totalPrice = 0;
        if (validatedData.paymentMethod === "INSTALLMENT") {
            totalPrice = (car.price - car.discount) + (Math.ceil((car.price * INTEREST_RATE) / 100));
        }
        else {
            totalPrice = car.price - car.discount;
        }
        const sale = await tx.sale.create({
            data: {
                carModelId: req.params.carId,
                userId: req.userId,
                carColor: validatedData.carColor,
                salePrice: totalPrice,
                saleDate: dateFormatter(new Date()),
                paymentMethod: validatedData.paymentMethod,
            },
            select: {
                id: true,
            }
        });
        res.status(201).json({
            ok: true,
            msg: "Order sent successfully"
        });
    });
};
export default newSale;
