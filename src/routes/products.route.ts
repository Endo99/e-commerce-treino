import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { newProductSchema, updateProductSchema } from "../models/product.models.js";
import { ProductsController } from "../controllers/products.controller.js";

export const productRoutes = Router();

productRoutes.get("/products", asyncHandler(ProductsController.getAll));
productRoutes.get("/products/:id", asyncHandler(ProductsController.getById));
productRoutes.post("/products", celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.save));
productRoutes.put("/products/:id", celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.updateById));
productRoutes.delete("/products/:id", asyncHandler(ProductsController.deleteById));