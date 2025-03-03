import validate from "../../utils/validation.js";
import { newUserSchema } from "../../validation/user.js";
import prisma from "../../services/prismaClient.js";
import { signJwt } from "../../utils/signJwt.js";
import sendEmail from "../../utils/sendEmail.js";
import hasher from "../../utils/hasher.js";
const newUser = async (req, res) => {
    const validatedData = validate(req.body, newUserSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            message: "Invalid data"
        });
    }
    else {
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        });
        if (user) {
            res.status(400).json({
                ok: false,
                message: "Email already exists"
            });
        }
        else {
            await prisma.user.create({
                data: {
                    ...validatedData,
                    password: await hasher(validatedData.password),
                }
            });
            const token = signJwt({ email: validatedData.email }, 1000 * 60 * 60 * 24);
            const isSend = sendEmail(validatedData.email, `<a href="http://localhost:5000/api/user/verify?token=${token}">Click here to verify your email</a>`);
            if (await isSend) {
                res.status(200).json({
                    ok: true,
                    message: "User created successfully check your email to verify"
                });
            }
            else {
                res.status(500).json({
                    ok: false,
                    message: "Failed to send email"
                });
            }
        }
    }
};
export default newUser;
//# sourceMappingURL=newUser.js.map