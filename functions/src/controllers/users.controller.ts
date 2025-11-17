import { Response, Request } from "express";
//import { messaging } from "firebase-admin";
import { User } from "../models/users.models.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    static async getAll(req: Request, res: Response) {
        
        res.send(await new UserService().getAll());

    }

    static async getById(req: Request, res: Response) {
        let userId = req.params.id;

        res.send(await new UserService().getByid(userId));

    }

    static async save(req: Request, res: Response) {

        await new UserService().save(req.body);

        res.status(201).send({
                message: `Usuário criado com sucesso!`
            });

    }

    static async updateById(req: Request, res: Response) {

        let userId = req.params.id;
        let user = req.body as User;

        await new UserService().upadateById(userId, user);

        res.send({
            message: "Usuário alterado com sucesso!"
        });

    }

    static async deleteById(req: Request, res: Response) {

        let userId = req.params.id;

        await new UserService().deleteById(userId);

        res.status(204).end()
    }
}