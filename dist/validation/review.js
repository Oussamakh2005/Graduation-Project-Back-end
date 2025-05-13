import { z } from "zod";
export const newReviewSchema = z.object({
    comment: z.string().min(20).max(250)
});
