import { Response, Request, NextFunction } from "express";
//import { messaging } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore"

type User = {
    id: number;
    nome: string;
    email: string;
}


export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {

        try {
            const snapshot = await getFirestore().collection("users").get();
            throw new Error("");
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()

                };
            });
            res.send(users);
        } catch (error) {
            next(error);
        }

    }

    static async getById(req: Request, res: Response) {
        try {
            let userId = req.params.id;

            const doc = await getFirestore().collection("users").doc(userId).get();

            res.send({
                id: doc.id,
                ...doc.data()
            });
        } catch (error) {
            res.status(500).send({
                message: "Erro Interno do Servidor"
            });
        }

    }

    static async save(req: Request, res: Response) {
        try {
            let user = req.body;

            const userSalvo = await getFirestore().collection("users").add(user);

            res.status(201).end(`Usuário ${userSalvo.id} criado com sucesso!`)
        } catch (erro) {
            res.status(500).send({
                message: "Erro Interno do Servidor"
            });
        }

    }

    static updateById(req: Request, res: Response) {

        try {
            let userId = req.params.id;
            let user = req.body as User;

            getFirestore().collection("users").doc(userId).set({
                nome: user.nome,
                email: user.email
            });

            res.send({
                message: "Usuário alterado com sucesso!"
            });
        } catch (error) {
            res.status(500).send(({
                message: "Erro Interno do Servidor",
            }));
        };
    }

    static async deleteById(req: Request, res: Response) {
        let userId = req.params.id;

        await getFirestore().collection("users").doc(userId).delete()

        res.status(204).end()
    }
}