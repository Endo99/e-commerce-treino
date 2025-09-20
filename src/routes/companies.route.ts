import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller";
import asyncHandler = require("express-async-handler");
import { celebrate, Segments } from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.models";

export const CompanyRoutes = Router();

CompanyRoutes.get("/companies", asyncHandler(CompaniesController.getAll));

CompanyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));

CompanyRoutes.post("/companies", celebrate({
    [Segments.BODY]: newCompanySchema
}), asyncHandler(CompaniesController.save));

CompanyRoutes.put("/companies/:id", celebrate({
    [Segments.BODY]: updateCompanySchema
}), asyncHandler(CompaniesController.updateById));
