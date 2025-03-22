import { Router } from "express";
import newUser from "../controllers/user/auth/newUser.js";
import login from "../controllers/user/auth/login.js";
import verifyUser from "../controllers/user/auth/verifyUser.js";
import isAuthenticated from "../middlewares/authenticated.js";
import authenticated from "../controllers/user/auth/authenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import updateUserRole from "../controllers/user/update/updateUserRole.js";
const usersRouter = Router();
usersRouter.post('/signup', newUser);
usersRouter.post('/login', login);
usersRouter.get('/verify', verifyUser);
usersRouter.get('/auhtenticated', isAuthenticated, authenticated);
usersRouter.patch('/role/:id', isAdmin, updateUserRole);
export default usersRouter;
//# sourceMappingURL=userRoutes.js.map