import jwt from "jsonwebtoken";
import { JWT } from "../env.js";
export const verifyJWT = (token) => {
    try {
        const payload = jwt.verify(token, JWT);
        return payload;
    }
    catch (error) {
        return null;
    }
};
