import { User } from '../models/users.models';
import { NotFoundError } from "../errors/not-found.errors";
import { UserRepository } from "../repository/user.respository";
import { AuthService } from './auth.service';

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

        const _user = await this.userRepository.getById(id)
        if (!_user) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        _user.nome = user.nome;
        _user.email = user.email;

        this.userRepository.updateById(_user);
    }

    async deleteById(id: string): Promise<void> {
        return this.userRepository.deleteById(id);
    }

}
