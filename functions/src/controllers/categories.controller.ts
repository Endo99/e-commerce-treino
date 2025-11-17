import { Response, Request } from "express";
import { CategoryService } from "../services/category.service.js";
import { Category } from "../models/category.models.js";

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
            
            res.send(await new CategoryService().getAll());
    
        }
    
        static async getById(req: Request, res: Response) {

            let categoryId = req.params.id;

            res.send(await new CategoryService().getByid(categoryId));

        }
    
        static async save(req: Request, res: Response) {
    
            await new CategoryService().save(req.body);
    
            res.status(201).send({
                message: `Categoria criada com sucesso!`
            });
    
        }
    
        static async updateById(req: Request, res: Response) {
    
            let categoryId = req.params.id;
            let category = req.body as Category;
    
            await new CategoryService().updateById(categoryId, category);
    
            res.send({
                message: "Categoria alterado com sucesso!"
            });
    
        }

        static async deleteById(req: Request, res: Response) {
        
                let categoryId = req.params.id;

                await new CategoryService().deleteById(categoryId);

                res.status(204).end();
            }
}