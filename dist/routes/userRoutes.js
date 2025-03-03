import { Router } from "express";
import newUser from "../controllers/user/newUser.js";
import login from "../controllers/user/login.js";
import verifyUser from "../controllers/user/verifyUser.js";
import isAuthenticated from "../middlewares/authenticated.js";
import authenticated from "../controllers/user/authenticated.js";
const usersRouter = Router();
usersRouter.post('/signup', newUser);
usersRouter.post('/login', login);
usersRouter.get('/verify', verifyUser);
usersRouter.get('/auhtenticated', isAuthenticated, authenticated);
export default usersRouter;
//# sourceMappingURL=userRoutes.js.map