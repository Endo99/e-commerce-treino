import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from '../models/product.models.js';
import { CategoryRepository } from "../repository/category.respository.js";
import { ProductRepository } from '../repository/produt.repository.js';
import { isStorageUrlValid } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductService {

    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadFileService = new UploadFileService("images/products/");
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.getAll();
    }

    async getByid(id: string): Promise<Product> {

        const product = await this.productRepository.getById(id)

        if (!product) {
            throw new NotFoundError("Produto não encontrado!");
        }
        return product;
    }

    async save(product: Product): Promise<void> {

        const category = await this.getCategoryById(product.categoria.id);

        product.categoria = category;

        if (product.imagem) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }

        await this.productRepository.save(product);
    }

    private async getCategoryById(id: string) {
        const category = await this.categoryRepository.getById(id);

        if (!category) {
            throw new NotFoundError("Categoria não encontrada!");
        }
        return category;
    }


    async updateById(id: string, product: Product): Promise<void> {

        const _product = await this.getByid(id);
        const category = await this.getCategoryById(product.categoria.id);

        if (product.imagem && !isStorageUrlValid(product.imagem)) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
            
        }

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.imagem = product.imagem;
        _product.preco = product.preco;
        _product.categoria = category;
        _product.ativa = product.ativa;

        await this.productRepository.updateById(_product);
    }

    async deleteById(id: string): Promise<void> {
        return this.productRepository.deleteById(id);
    }

}
