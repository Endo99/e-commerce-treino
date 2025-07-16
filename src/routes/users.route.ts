import express = require("express");
import { UsersController } from "../controllers/users.controller";
import asyncHandler = require("express-async-handler");

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));

userRoutes.get("/users/:id", asyncHandler(UsersController.getById));

userRoutes.post("/users", asyncHandler(UsersController.save));

userRoutes.put("/users/:id", asyncHandler(UsersController.updateById));

userRoutes.delete("/users/:id", asyncHandler(UsersController.deleteById));