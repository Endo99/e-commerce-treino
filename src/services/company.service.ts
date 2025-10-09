import { NotFoundError } from "../errors/not-found.error.js";
import { Company } from '../models/company.models.js';
import { CompanyRepository } from '../repository/company.respository.js';
import { UploadFileService } from "./upload-file.service.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";

export class CompanyService {

    private companyRepository: CompanyRepository;
    private updateFileService: UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository();
        this.updateFileService = new UploadFileService("images/companies/");
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    async getByid(id: string): Promise<Company> {

        const company = await this.companyRepository.getById(id)

        if (!company) {
            throw new NotFoundError("Empresa não encontrada !");
        }
        return company;
    }

    async save(company: Company): Promise<void> {
        const logomarcaUrl = await this.updateFileService.upload(company.logomarca);
        company.logomarca = logomarcaUrl;
        await this.companyRepository.save(company);
    }

    async upadateById(id: string, company: Company): Promise<void> {

        const _company = await this.getByid(id);

        if (!isStorageUrlValid(company.logomarca)) {
            _company.logomarca = await this.updateFileService.upload(company.logomarca);
        }

        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativa = company.ativa;

        await this.companyRepository.updateById(_company);
    }

}
