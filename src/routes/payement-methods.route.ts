import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PaymentMethodsController } from "../controllers/payment-methods.controller.js";
import { newPaymentMethodSchema, updatePaymentMethodSchema } from "../models/payment-methods.models.js";

export const paymentMethodsRoutes = Router();

paymentMethodsRoutes.get("/payment-methods", asyncHandler(PaymentMethodsController.getAll));
paymentMethodsRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodsController.getById));
paymentMethodsRoutes.post("/payment-methods", celebrate({ [Segments.BODY]: newPaymentMethodSchema }), asyncHandler(PaymentMethodsController.save));
paymentMethodsRoutes.put("/payment-methods/:id", celebrate({ [Segments.BODY]: updatePaymentMethodSchema }), asyncHandler(PaymentMethodsController.updateById));
paymentMethodsRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodsController.deleteById));