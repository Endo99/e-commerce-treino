import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { newOrderSchema, searchParamsOrderQuerySchema } from "../models/order.model.js";
import expressAsyncHandler from "express-async-handler";
import { OrderController } from "../controllers/order.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({[Segments.BODY]: newOrderSchema}), expressAsyncHandler(OrderController.save));
orderRoutes.get("/orders", celebrate({[Segments.QUERY]: searchParamsOrderQuerySchema}), expressAsyncHandler(OrderController.search));