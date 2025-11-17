import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment-methods.models.js";
import { PaymentMethodsRepository } from "../repository/payment-methods.repository.js";

export class PaymentMethodsService {

    private paymentMethodsRepository: PaymentMethodsRepository;

    constructor() {
        this.paymentMethodsRepository = new PaymentMethodsRepository();
    }

    async getAll(): Promise<PaymentMethod[]> {
        return this.paymentMethodsRepository.getAll();
    }

    async getById(id: string): Promise<PaymentMethod> {

        const paymentMethod = await this.paymentMethodsRepository.getById(id);
        if (!paymentMethod) {
            throw new NotFoundError("Método de pagamento não encontrado!");
        }

        return paymentMethod;
    }

    async save(paymentMethod: PaymentMethod): Promise<void> {
        await this.paymentMethodsRepository.save(paymentMethod);
    }

    async updateById(id: string, paymentMethod: PaymentMethod): Promise<void> {

        const _paymentMethod = await this.getById(id);

        _paymentMethod.descricao = paymentMethod.descricao;
        _paymentMethod.ativa = paymentMethod.ativa;

        await this.paymentMethodsRepository.updateById(_paymentMethod);
    }

    async deleteById(id: string): Promise<void> {
        return this.paymentMethodsRepository.deleteById(id);
    }

}
