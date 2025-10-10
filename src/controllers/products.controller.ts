import { Response, Request } from "express";
import { ProductService } from "../services/product.service.js";
import { Product } from "../models/product.models.js";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        res.send(await new ProductService().getAll());
    }

    static async search(req: Request, res: Response) {
        const categoriaId = req.query.categoriaId as string;
        res.send(await new ProductService().search(categoriaId));
    }

    static async getById(req: Request, res: Response) {

        let productId = req.params.id;

        res.send(await new ProductService().getByid(productId));

    }

    static async save(req: Request, res: Response) {

        await new ProductService().save(req.body);

        res.status(201).send({
            message: `Produto criado com sucesso!`
        });

    }

    static async updateById(req: Request, res: Response) {

        let productId = req.params.id;
        let product = req.body as Product;

        await new ProductService().updateById(productId, product);

        res.send({
            message: "Produto alterado com sucesso!"
        });

    }

    static async deleteById(req: Request, res: Response) {

        let productId = req.params.id;

        await new ProductService().deleteById(productId);

        res.status(204).end();
    }
}