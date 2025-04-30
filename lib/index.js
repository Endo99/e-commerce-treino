"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.json());
app.get("/", function (req, res) {
    res.send("Bem vindo ao curso de Node.js - tsc-watch");
});
app.get("/users", function (req, res) {
    res.send(usuarios);
});
var id = 0;
var usuarios = [];
app.post("/users", function (req, res) {
    var user = req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    });
});
app.get("/users/:id", function (req, res) {
    var userId = Number(req.params.id);
    var user = usuarios.find(function (user) { return user.id === userId; });
    res.send(user);
});
app.put("/users/:id", function (req, res) {
    var userId = Number(req.params.id);
    var user = req.body;
    var indexOf = usuarios.findIndex(function (_user) { return _user.id === userId; });
    usuarios[indexOf].nome = user.nome;
    usuarios[indexOf].email = user.email;
    res.send({
        message: "Usuário alterado com sucesso!"
    });
});
app.delete("/users/:id", function (res, req) {
    var userId = Number(req.params.id);
    var userFind = usuarios.findIndex(function (_user) { return _user.id === userId; });
    usuarios.splice(userFind, 1);
    res.send({
        message: "Usário excluído com sucesso!"
    });
});
app.listen(3000, function () {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map