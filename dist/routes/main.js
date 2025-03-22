import { Router } from "express";
import usersRouter from "./userRoutes.js";
import carsRouter from "./carRoutes.js";
const router = Router();
router.use('/user', usersRouter);
router.use('/car', carsRouter);
export default router;
//# sourceMappingURL=main.js.map