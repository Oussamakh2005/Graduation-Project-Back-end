import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isPayment from "../middlewares/isPayment.js";
import makeFullPayment from "../controllers/payment/FULL/makeFullPayment.js";
import makeDownPayment from "../controllers/payment/FULL/makeDownPayment.js";
import authenticated from "../middlewares/authenticated.js";
import getUserPayments from "../controllers/payment/getUserPayments.js";
const paymentRouter = Router();
paymentRouter.post("/downpayment/:saleId", errorHandler(isPayment), errorHandler(makeDownPayment));
paymentRouter.post("/fullpayment/:saleId", errorHandler(isPayment), errorHandler(makeFullPayment));
paymentRouter.get("/user", errorHandler(authenticated), errorHandler(getUserPayments));
export default paymentRouter;
