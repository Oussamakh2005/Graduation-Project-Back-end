import validate from "../../../utils/validation.js";
import { updateUserRoleSchema } from "../../../validation/user.js";
import prisma from "../../../services/prismaClient.js";
const updateUserRole = async (req, res) => {
    const id = req.params.id;
    const validatedData = validate(req.body, updateUserRoleSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            message: "Invalid data"
        });
    }
    else {
        try {
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
        }
        catch (err) {
            res.status(500).json({
                ok: false,
                message: "Something went wrong"
            });
        }
    }
};
export default updateUserRole;
//# sourceMappingURL=updateUserRole.js.map