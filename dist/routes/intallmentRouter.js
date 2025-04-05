import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isAuthenticated from "../middlewares/authenticated.js";
import getInstallments from "../controllers/installments/getInstallments.js";
import getInstallment from "../controllers/installments/getInstallment.js";
const installmentRouter = Router();
installmentRouter.get('/all/:saleId', errorHandler(isAuthenticated), errorHandler(getInstallments));
installmentRouter.get('/:id', errorHandler(isAuthenticated), errorHandler(getInstallment));
export default installmentRouter;
