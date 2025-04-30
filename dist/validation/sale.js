import { z } from "zod";
export const newSaleSchema = z.object({
    carColor: z.string().min(3),
    paymentMethod: z.enum(["CASH", "ONLINE", "INSTALLMENT"]),
});
export const updatePickupStutusSchema = z.object({
    status: z.enum(["PENDING", "READY", "PICKED_UP"]),
});
