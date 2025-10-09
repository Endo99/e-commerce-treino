import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from '../models/category.models.js';
import { CategoryRepository } from '../repository/category.respository.js';

export class CategoryService {

    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
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
        return this.categoryRepository.deleteById(id);
    }

}
