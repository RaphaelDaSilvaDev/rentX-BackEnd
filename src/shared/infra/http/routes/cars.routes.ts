import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCase/listCars/ListAvailableCarsController";
import { UploadCarsImageController } from "@modules/cars/useCase/uploadCarImage/UploadCarImageController";
import upload from "@config/upload";

import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarsImageController();

const uploadImageCar = multer(upload.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadImageCar.array("images"),
  uploadCarsImageController.handle
);

export { carsRoutes };
