import express = require("express");
import {Request, Response, NextFunction} from "express";
import { InternalServerError } from "../errors/internal-server.error.js";
import { errors } from "celebrate";
import { ErrorBase } from "../errors/base.error.js";

export const errorHandle = (app: express.Express) => {
    app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
         console.error("Erro capturado:", error.message);

        if (error instanceof ErrorBase) {
            error.send(res);
        } else {
            new InternalServerError().send(res);
        }

    });

}