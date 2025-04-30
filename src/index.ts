import express = require("express");
import { Request, Response } from "express"; 

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bem vindo ao curso de Node.js - tsc-watch");

});

app.get("/users", (req: Request, res: Response) => {
    
    res.send(usuarios);
});

type User = {
    id: number;
    nome: string;
    email: string;
}

let id = 0;
let usuarios: User[] = [];

app.post("/users", (req: Request, res: Response) =>
{
    let user = req.body;

    user.id = ++id;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    })

})

app.get("/users/:id", (req: Request, res: Response) => 
{
    let userId = Number(req.params.id);

    let user = usuarios.find(user => user.id === userId);

    res.send(user);
});

app.put("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = req.body;

    let indexOf = usuarios.findIndex((_user: User) => _user.id === userId);

    usuarios[indexOf].nome = user.nome;
    usuarios[indexOf].email = user.email;

    res.send({
        message: "Usuário alterado com sucesso!"
    })
})

app.delete("/users/:id", (res: Response, req: Request) => {
    let userId = Number(req.params.id);

    let userFind = usuarios.findIndex((_user: User) => _user.id === userId);

    usuarios.splice(userFind, 1);

    res.send({
        message: "Usário excluído com sucesso!"
    })
})

app.listen(3000, () =>  {
    console.log("Servidor ativo na porta 3000");
});
