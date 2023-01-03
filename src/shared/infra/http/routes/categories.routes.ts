import { CreateCategoryController } from "@modules/cars/useCase/createCategory/CreateCategoryController";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ImportCategoryController } from "@modules/cars/useCase/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCase/listCategory/ListCategoryController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
