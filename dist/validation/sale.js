import { number, z } from "zod";
export const newSaleSchema = z.object({
    carColor: z.string().min(3),
    paymentMethod: z.enum(["CASH", "ONLINE", "INSTALLMENT"]),
    installmentsNumber: number().min(12).max(24).optional(),
});
