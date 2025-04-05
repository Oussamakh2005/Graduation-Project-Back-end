import { z } from "zod";
export const downPaymentSchema = z.object({
    installmentsNumber: z.number().min(10).max(24)
});
export const fullPaymentSchema = z.object({
    amount: z.number().positive()
});
