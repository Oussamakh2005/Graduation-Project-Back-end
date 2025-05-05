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
            sendNotificaionEmail(sale.user.email, `عزيزي ${sale.user.firstName} ${sale.user.lastName}،

يسعدنا إبلاغك بأن سيارتك أصبحت جاهزة للاستلام من مركزنا. يمكنك زيارتنا خلال ساعات العمل لاستلام سيارتك.

الموقع: مركز استلام Drivona  
ساعات العمل: من الإثنين إلى الجمعة من 9:00 صباحًا حتى 6:00 مساءً، ويوم السبت من 10:00 صباحًا حتى 4:00 مساءً

يرجى إحضار بطاقة الهوية ووثائق الشراء عند الحضور لاستلام السيارة.

إذا كانت لديك أي استفسارات، لا تتردد في التواصل مع خدمة العملاء لدينا.

مع أطيب التحيات،  
فريق Drivona`);
            break;
        case "PICKED_UP":
            sendNotificaionEmail(sale.user.email, `عزيزي ${sale.user.firstName} ${sale.user.lastName}،

نود تأكيد أنك قد استلمت سيارتك بنجاح من مركزنا.

نأمل أن تكون راضيًا عن عملية الشراء والخدمة التي قدمناها لك في Drivona. إذا كان لديك أي ملاحظات أو استفسارات بشأن تجربتك، فلا تتردد في إخبارنا.

شكرًا لاختيارك Drivona لتلبية احتياجاتك في عالم السيارات. نتطلع إلى خدمتك مرة أخرى في المستقبل.

مع أطيب التحيات،  
فريق Drivona`);
            break;
    }
    res.status(200).json({
        ok: true,
        msg: `Pickup status updated to ${validatedData.status} successfully`,
    });
};
export default updatePickupStatus;
