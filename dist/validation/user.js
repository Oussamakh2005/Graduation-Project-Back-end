import { z } from 'zod';
export const newUserSchema = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    email: z.string().email(),
    phone: z.string().length(10).regex(/^(05|06|07)\d{8}$/),
    password: z.string().min(8).max(20),
});
export const updateUserRoleSchema = z.enum(["ADMIN", "SALES", "PAYMENT", "CLIENT"]);
