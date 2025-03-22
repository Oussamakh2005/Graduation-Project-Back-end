import { z } from "zod";
export const newCarSchema = z.object({
    model: z.string().min(2),
    year: z.string().length(4),
    colors: z.array(z.string()).min(1),
    type: z.enum(["SUDAN", "HATCHBACK", "SUV", "TRUCK", "VAN", "COUPE", "CONVERTIBLE", "WAGON", "SPORTS", "HYBRID"]),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]),
    drive: z.enum(["FWD", "RWD", "AWD"]),
    engine: z.object({
        type: z.enum(["PETROL", "GAS", "DIESEL", "ELECTRIC", "HYBRID"]),
        capacity: z.number().positive(),
        horsepower: z.number().positive(),
    }),
    features: z.array(z.string()).min(1),
    price: z.number().positive(),
    discount: z.number().positive().optional(),
});
export const initializeCarSchema = z.object({
    model: z.string().min(2),
    year: z.string().length(4),
    type: z.enum(["SUDAN", "HATCHBACK", "SUV", "TRUCK", "VAN", "COUPE", "CONVERTIBLE", "WAGON", "SPORTS", "HYBRID"]),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]),
    driveType: z.enum(["FWD", "RWD", "AWD"]),
});
export const engineSchema = z.object({
    carId: z.string(),
    type: z.enum(["PETROL", "GAS", "DIESEL", "ELECTRIC", "HYBRID"]),
    capacity: z.number().positive(),
    horsepower: z.number().positive(),
});
export const carFeaturesSchema = z.object({
    colors: z.array(z.string()).min(1),
    features: z.array(z.string()).min(1),
    price: z.number().positive(),
    discount: z.number().positive().optional(),
});
export const updateCarSchema = z.object({
    model: z.string().min(2).optional(),
    year: z.string().length(4).optional(),
    colors: z.array(z.string()).min(1).optional(),
    type: z.enum(["SUDAN", "HATCHBACK", "SUV", "TRUCK", "VAN", "COUPE", "CONVERTIBLE", "WAGON", "SPORTS", "HYBRID"]).optional(),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]).optional(),
    drive: z.enum(["FWD", "RWD", "AWD"]).optional(),
    features: z.array(z.string()).min(1).optional(),
    price: z.number().positive().optional(),
    discount: z.number().positive().optional(),
    availability: z.boolean().optional(),
});
export const updateEngineSchema = z.object({
    type: z.enum(["PETROL", "GAS", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
    capacity: z.number().positive().optional(),
    horsepower: z.number().positive().optional(),
});
//# sourceMappingURL=car.js.map