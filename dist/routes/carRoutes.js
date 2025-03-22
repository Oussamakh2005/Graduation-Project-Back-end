import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../services/multer.js";
import initializeCar from "../controllers/car/newCar/initialize.js";
import setEngine from "../controllers/car/newCar/engine.js";
import setCarFeatures from "../controllers/car/newCar/carFeatures.js";
import uploadCarImages from "../controllers/car/newCar/uploadCarImages.js";
import getCarsList from "../controllers/car/browse/getCarsList.js";
import getCar from "../controllers/car/browse/getCar.js";
import deleteCar from "../controllers/car/delete/deleteCar.js";
import updateCar from "../controllers/car/update/updateCar.js";
import updateEngine from "../controllers/car/update/updateEngine.js";
const carsRouter = Router();
carsRouter.post('/init', isAdmin, initializeCar);
carsRouter.post('/engine', isAdmin, setEngine);
carsRouter.put('/feature/:id', isAdmin, setCarFeatures);
carsRouter.put('/images/:id', isAdmin, upload.array('images', 4), uploadCarImages);
carsRouter.get('/all', getCarsList);
carsRouter.get('/:id', getCar);
carsRouter.put('/:id', isAdmin, updateCar);
carsRouter.put('/engine/:id', isAdmin, updateEngine);
carsRouter.delete('/:id', isAdmin, deleteCar);
export default carsRouter;
//# sourceMappingURL=carRoutes.js.map