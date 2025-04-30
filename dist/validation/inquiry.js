import { z } from "zod";
export const inquirySchema = z.object({
    fullName: z.string().min(6).max(50),
    email: z.string().email(),
    message: z.string().min(10).max(500)
});
export const inquiryResponseSchema = z.object({
    message: z.string().min(10).max(500),
});
