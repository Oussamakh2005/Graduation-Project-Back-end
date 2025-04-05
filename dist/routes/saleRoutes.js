import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isAuthenticated from "../middlewares/authenticated.js";
import newSale from "../controllers/sale/newSale.js";
import getSale from "../controllers/sale/getSale.js";
import isSale from "../middlewares/isSale.js";
import getSalesList from "../controllers/sale/getSalesList.js";
const saleRouter = Router();
saleRouter.post('/:carId', errorHandler(isAuthenticated), errorHandler(newSale));
saleRouter.get('/:saleId', errorHandler(isAuthenticated), errorHandler(getSale));
saleRouter.get('/', errorHandler(isSale), errorHandler(getSalesList));
export default saleRouter;
