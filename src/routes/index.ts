import express = require("express");
import {userRoutes} from "./users.route";

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRoutes);
}