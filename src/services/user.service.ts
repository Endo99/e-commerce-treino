import { User } from '../models/users.models.js';
import { NotFoundError } from "../errors/not-found.error.js";
import { UserRepository } from "../repository/user.respository.js";
import { AuthService } from './auth.service.js';

export class UserService {

    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getByid(id: string): Promise<User> {

        const user = await this.userRepository.getById(id)

        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        return user;
    }

    async save(user: User): Promise<void> {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        await this.userRepository.updateById(user);
    }

    async upadateById(id: string, user: User): Promise<void> {

        const _user = await this.getByid(id);

        _user.nome = user.nome;
        _user.email = user.email;

        await this.authService.update(id, user);
        await this.userRepository.updateById(_user);
    }

    async deleteById(id: string): Promise<void> {
        await this.authService.delete(id);
        return this.userRepository.deleteById(id);
    }

}
