import jwt from "jsonwebtoken";
import { JWT } from "../env.js";
export const verifyJWT = (token, secret = JWT) => {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    }
    catch (error) {
        return null;
    }
};
