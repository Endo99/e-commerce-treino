import express = require("express");
import { UsersController } from "../controllers/users.controller";
import asyncHandler = require("express-async-handler");
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/users.models";

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));

userRoutes.get("/users/:id", asyncHandler(UsersController.getById));

userRoutes.post("/users", celebrate({
    [Segments.BODY]: userSchema
}), asyncHandler(UsersController.save));

userRoutes.put("/users/:id", celebrate({
    [Segments.BODY]: userSchema
}), asyncHandler(UsersController.updateById));

userRoutes.delete("/users/:id", asyncHandler(UsersController.deleteById));