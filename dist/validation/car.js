import { z } from "zod";
export const initializeCarSchema = z.object({
    model: z.string().min(2),
    year: z.number().min(2022),
    type: z.enum(["SEDAN", "HATCHBACK", "SUV", "TRUCK", "VAN", "COUPE", "CONVERTIBLE", "WAGON", "SPORTS", "HYBRID"]),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]),
    driveType: z.enum(["FRONT_WHEEL", "REAR_WHEEL", "ALL_WHEEL"]),
    price: z.number().positive(),
    discount: z.number().optional().default(0),
});
export const engineSchema = z.object({
    carModelId: z.string(),
    type: z.enum(["PETROL", "GAS", "DIESEL", "ELECTRIC", "HYBRID"]),
    capacity: z.number().positive(),
    horsepower: z.number().positive(),
});
export const carFeaturesSchema = z.object({
    colors: z.array(z.string()).min(1),
    features: z.array(z.string()).min(1),
});
export const updateCarSchema = z.object({
    model: z.string().min(2).optional(),
    year: z.string().length(4).optional(),
    colors: z.array(z.string()).min(1).optional(),
    type: z.enum(["SEDAN", "HATCHBACK", "SUV", "TRUCK", "VAN", "COUPE", "CONVERTIBLE", "WAGON", "SPORTS", "HYBRID"]).optional(),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]).optional(),
    drive: z.enum(["FRONT_WHEEL", "REAR_WHEELD", "ALL_WHEEL"]).optional(),
    features: z.array(z.string()).min(1).optional(),
    price: z.number().positive().optional(),
    discount: z.number().optional().default(0),
    availability: z.boolean().optional(),
});
export const updateEngineSchema = z.object({
    type: z.enum(["PETROL", "GAS", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
    capacity: z.number().positive().optional(),
    horsepower: z.number().positive().optional(),
});
