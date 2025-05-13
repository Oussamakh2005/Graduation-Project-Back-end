import Exceptions from "../utils/Exceptions.js";
import HttpExeception from "../utils/HttpExeception.js";
export const errorResponse = (err, req, res, next) => {
    res.status(err.status).json({
        ok: false,
        msg: err.message,
        error: err.error
    });
};
export const errorHandler = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next);
        }
        catch (err) {
            if (err instanceof HttpExeception) {
                next(err);
            }
            else {
                next(new HttpExeception("Something went worng", 500, Exceptions.INTERNAL_ERROR));
            }
        }
    };
};
