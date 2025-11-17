import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { changeStatusOrderSchema, newOrderSchema, searchParamsOrderQuerySchema } from "../models/order.model.js";
import expressAsyncHandler from "express-async-handler";
import { OrderController } from "../controllers/order.controller.js";

export const orderRoutes = Router();

orderRoutes.post(
    "/orders",
    celebrate({ [Segments.BODY]: newOrderSchema }),
    expressAsyncHandler(OrderController.save)
);

orderRoutes.get(
    "/orders",
    celebrate({ [Segments.QUERY]: searchParamsOrderQuerySchema }),
    expressAsyncHandler(OrderController.search)
);

orderRoutes.get(
    "/orders/:id/items",
    expressAsyncHandler(OrderController.getItems)
);

orderRoutes.get(
    "/orders/:id",
    expressAsyncHandler(OrderController.getById)
);

orderRoutes.post(
    "/orders/:id/status",
    celebrate({[Segments.BODY]: changeStatusOrderSchema}),
    expressAsyncHandler(OrderController.changeStatus)
);