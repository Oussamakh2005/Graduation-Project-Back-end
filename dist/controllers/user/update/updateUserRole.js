import validate from "../../../utils/validation.js";
import { updateUserRoleSchema } from "../../../validation/user.js";
import prisma from "../../../services/db/prismaClient.js";
import HttpExeception from "../../../utils/HttpExeception.js";
import Exceptions from "../../../utils/Exceptions.js";
const updateUserRole = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateUserRoleSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid data", 422, Exceptions.INVALID_DATA);
    }
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: validatedData
        }
    });
    res.status(200).json({
        ok: true,
        message: "Role updated successfully"
    });
};
export default updateUserRole;
