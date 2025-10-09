import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CategoriesController } from "../controllers/categories.controller.js";
import { celebrate, Segments } from "celebrate";
import { newCategorySchema, updateCategorySchema } from "../models/category.models.js";

export const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHandler(CategoriesController.getAll));
categoryRoutes.get("/categories/:id", asyncHandler(CategoriesController.getById));
categoryRoutes.post("/categories", celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.save));
categoryRoutes.put("/categories/:id", celebrate({ [Segments.BODY]: updateCategorySchema }), asyncHandler(CategoriesController.updateById));
categoryRoutes.delete("/categories/:id", asyncHandler(CategoriesController.deleteById));