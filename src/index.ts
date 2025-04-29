import express = require("express");
import { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Bem vindo ao curso de Node.js - tsc-watch");

});

app.get("/users", (req: Request, res: Response) => {
    let usuarios = [{
        nome: "Derci Santos",
        idade: 33
    },
    {
        nome: "João da Silva",
        idade: 44
    }]

    res.send(usuarios);
});

app.listen(3000, () =>  {
    console.log("Servidor ativo na porta 3000");
});
