import validate from '../utils/validation.js';
import { newCarSchema } from '../validation/car.js';
const validateCarSchema = (req, res, next) => {
    const validatedData = validate(req.body, newCarSchema);
    if (validatedData) {
        next();
    }
    else {
        res.status(400).json({
            ok: false,
            msg: "Invalid car data"
        });
    }
};
export default validateCarSchema;
//# sourceMappingURL=validateCarSchema.js.map