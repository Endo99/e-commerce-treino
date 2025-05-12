import express = require("express");
import {routes} from "./routes/index";
import { initializeApp } from 'firebase-admin/app';
import { NextFunction, Request, Response } from "express";

initializeApp()

const app = express();

routes(app);

app.use((error: Error, req: Request, response: Response, next: NextFunction) => {
    response.status(500).send(
        {
            message:"Erro Interno do Servidor"
        }
    )
});

app.listen(3000, () =>  {
    console.log("Servidor ativo na porta 3000");
});
