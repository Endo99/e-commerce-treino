import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newUserSchema, updateUserSchema } from "../models/users.models.js";

export const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));

userRoutes.get("/users/:id", asyncHandler(UsersController.getById));

userRoutes.post("/users", celebrate({
    [Segments.BODY]: newUserSchema
}), asyncHandler(UsersController.save));

userRoutes.put("/users/:id", celebrate({
    [Segments.BODY]: updateUserSchema
}), asyncHandler(UsersController.updateById));

userRoutes.delete("/users/:id", asyncHandler(UsersController.deleteById));