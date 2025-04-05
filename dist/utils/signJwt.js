import jwt from "jsonwebtoken";
import { JWT } from "../env.js";
export const signJwt = (data, expireIn) => {
    const token = jwt.sign(data, JWT, { expiresIn: expireIn });
    return token;
};
