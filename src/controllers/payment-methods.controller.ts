import { Request, Response } from "express";
import { PaymentMethodsService } from "../services/payment-methods.service.js";
import { PaymentMethod } from "../models/payment-methods.models.js";

export class PaymentMethodsController {

    static async getAll(req: Request, res: Response) {
        res.send(await new PaymentMethodsService().getAll());
    }

    static async getById(req: Request, res: Response) {
       
        let paymentMethodId = req.params.id;

        res.send(await new PaymentMethodsService().getById(paymentMethodId));
    }

    static async save(req: Request, res: Response) {
        await new PaymentMethodsService().save(req.body);
        res.status(201).send({
            message: `Método de pagamento criado com sucesso!`
        });
    }

    static async updateById(req: Request, res: Response) {

        let paymentMethodId = req.params.id;
        let paymentMethod = req.body as PaymentMethod;

        await new PaymentMethodsService().updateById(paymentMethodId, paymentMethod);

        res.send({
            message: "Método de pagamento alterado com sucesso!"
        });
    }

    static async deleteById(req: Request, res: Response) {
        let paymentMethodId = req.params.id;
        await new PaymentMethodsService().deleteById(paymentMethodId);
        res.status(204).end();
    }

}