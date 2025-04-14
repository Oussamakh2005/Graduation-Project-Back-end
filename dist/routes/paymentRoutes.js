import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isPayment from "../middlewares/isPayment.js";
import makeDownPayment from "../controllers/payment/INSTALLMENT/makeDownPayment.js";
import makeFullPayment from "../controllers/payment/FULL/makeFullPayment.js";
import isAuthenticated from "../middlewares/authenticated.js";
import getDownPaymentValue from "../controllers/payment/INSTALLMENT/getDownPaymentValue.js";
import payForInstallment from "../controllers/payment/INSTALLMENT/payForIntallment.js";
const paymentRouter = Router();
paymentRouter.post("/downpayment/:saleId", errorHandler(isPayment), errorHandler(makeDownPayment));
paymentRouter.get("/downpayment/value/:saleId", errorHandler(isAuthenticated), errorHandler(getDownPaymentValue));
paymentRouter.post("/fullpayment/:saleId", errorHandler(isPayment), errorHandler(makeFullPayment));
paymentRouter.post("/installment/:id", errorHandler(isPayment), errorHandler(payForInstallment));
export default paymentRouter;
