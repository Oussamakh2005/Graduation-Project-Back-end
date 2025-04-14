import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import validate from "../../utils/validation.js";
import sendNotificaionEmail from "../../services/email/sendNotificaionEmainl.js";
import { updatePickupStutusSchema } from "../../validation/sale.js";
const updatePickupStatus = async (req, res) => {
    const id = req.params.id;
    const sale = await prisma.sale.findUnique({
        where: {
            id: id,
        },
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
    });
    if (!sale) {
        throw new HttpExeception("No sale found", 404, Exceptions.NOT_FOUND);
    }
    const validatedData = validate(req.body, updatePickupStutusSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.sale.update({
        where: {
            id: sale.id,
        },
        data: {
            pickupStatus: validatedData.status,
        }
    });
    switch (validatedData.status) {
        case "READY":
            sendNotificaionEmail(sale.user.email, `Dear ${sale.user.firstName} ${sale.user.lastName},

We are pleased to inform you that your car is now ready for pickup at our facility. You can visit us during our business hours to collect your vehicle.

Location: Drivona Pickup Center
Business Hours: Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM

Please bring your ID and purchase documentation when you come to pick up your car.

If you have any questions, please don't hesitate to contact our customer service.

Best regards,
Drivona Team`);
            break;
        case "PICKED_UP":
            sendNotificaionEmail(sale.user.email, `Dear ${sale.user.firstName} ${sale.user.lastName},

This is to confirm that you have successfully picked up your car from our facility. 

We hope you are satisfied with your purchase and the service provided by Drivona. If you have any feedback or concerns about your experience, please let us know.

Thank you for choosing Drivona for your automotive needs. We look forward to serving you again in the future.

Best regards,
Drivona Team`);
            break;
    }
    res.status(200).json({
        ok: true,
        msg: `Pickup status updated to ${validatedData.status} successfully`,
    });
};
export default updatePickupStatus;
