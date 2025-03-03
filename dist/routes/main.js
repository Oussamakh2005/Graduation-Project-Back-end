import { Router } from "express";
import usersRouter from "./userRoutes.js";
const router = Router();
router.use('/user', usersRouter);
export default router;
//# sourceMappingURL=main.js.map