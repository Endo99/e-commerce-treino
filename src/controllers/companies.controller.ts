import { Response, Request } from "express";
//import { messaging } from "firebase-admin";
import { CompanyService } from "../services/company.service.js";
import { Company } from "../models/company.models.js";

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        
        res.send(await new CompanyService().getAll());

    }

    static async getById(req: Request, res: Response) {
        let companyId = req.params.id;

        res.send(await new CompanyService().getByid(companyId));

    }

    static async save(req: Request, res: Response) {

        await new CompanyService().save(req.body);

        res.status(201).send({
                message: `Empresa criada com sucesso!`
            });

    }

    static async updateById(req: Request, res: Response) {

        let companyId = req.params.id;
        let company = req.body as Company;

        await new CompanyService().upadateById(companyId, company);

        res.send({
            message: "Empresa alterado com sucesso!"
        });

    }
}