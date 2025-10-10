import express = require("express");
import {userRoutes} from "./users.route.js";
import { authRoutes } from "./auth.route.js";
import { CompanyRoutes } from "./companies.route.js";
import { categoryRoutes } from "./categories.routes.js";
import { productRoutes } from "./products.route.js";
import { paymentMethodsRoutes } from "./payement-methods.route.js";

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "100mb" }));
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(CompanyRoutes);
    app.use(categoryRoutes);
    app.use(productRoutes);
    app.use(paymentMethodsRoutes);
}