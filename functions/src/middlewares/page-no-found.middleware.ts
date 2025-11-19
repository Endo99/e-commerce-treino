import express from "express";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found.error.js";

export const pageNotFoundHandler = (app : express.Express) => {
    app.use((req: Request, resp: Response, next: NextFunction) => {
        next((new NotFoundError("Página não encontrada!")));
    });
}