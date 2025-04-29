"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Bem vindo ao curso de Node.js - tsc-watch");
});
app.get("/users", function (req, res) {
    var usuarios = [{
            nome: "Derci Santos",
            idade: 33
        },
        {
            nome: "João da Silva",
            idade: 44
        }];
    res.send(usuarios);
});
app.listen(3000, function () {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map