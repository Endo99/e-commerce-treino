import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Category } from '../models/category.models.js';
import { CategoryRepository } from '../repository/category.respository.js';
import { ProductRepository } from "../repository/produt.repository.js";

export class CategoryService {

    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }

    async getByid(id: string): Promise<Category> {

        const category = await this.categoryRepository.getById(id)

        if (!category) {
            throw new NotFoundError("Categoria não encontrada!");
        }
        return category;
    }

    async save(category: Category): Promise<void> {
        await this.categoryRepository.save(category);
    }

    async updateById(id: string, category: Category): Promise<void> {

        const _category = await this.getByid(id);


        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this.categoryRepository.updateById(_category);
    }

    async deleteById(id: string): Promise<void> {
        if (await this.productRepository.getCountByCategoria(id) > 0) {
            throw new ValidationError("Não é possível excluir uma categoria com produtos relacionados!");
        }
        return this.categoryRepository.deleteById(id);
    }

}
