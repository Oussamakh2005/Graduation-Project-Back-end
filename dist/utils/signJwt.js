import jwt from "jsonwebtoken";
import { JWT } from "../env.js";
export const signJwt = (data, expireIn, secret = JWT) => {
    const token = jwt.sign(data, secret, { expiresIn: expireIn });
    return token;
};
