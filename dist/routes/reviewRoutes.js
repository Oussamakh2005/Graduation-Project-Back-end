import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import isAuthenticated from "../middlewares/authenticated.js";
import newReview from "../controllers/reviews/newReview.js";
import getReviews from "../controllers/reviews/getReviews.js";
const reviewRouter = Router();
reviewRouter.post('/:id', errorHandler(isAuthenticated), errorHandler(newReview));
reviewRouter.get('/:id', errorHandler(getReviews));
export default reviewRouter;
