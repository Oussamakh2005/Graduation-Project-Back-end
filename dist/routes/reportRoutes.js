import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isAdmin from "../middlewares/isAdmin.js";
import adminHighlights from "../controllers/report/adminHighlights.js";
import adminChart from "../controllers/report/adminChart.js";
const reportRouter = Router();
reportRouter.get('/adminHighlights', errorHandler(isAdmin), errorHandler(adminHighlights));
reportRouter.get('/adminChart', errorHandler(isAdmin), errorHandler(adminChart));
export default reportRouter;
