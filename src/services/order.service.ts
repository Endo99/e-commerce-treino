import { NotFoundError } from "../errors/not-found.error.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repository/company.respository.js";
import { OrderRepository } from "../repository/order.repository.js";
import { PaymentMethodsRepository } from "../repository/payment-methods.repository.js";
import { ProductRepository } from "../repository/produt.repository.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository: PaymentMethodsRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodsRepository();
        this.productRepository = new ProductRepository();
    }

    async save(order: Order) {
        const company = await this.companyRepository.getById(order.empresa.id!);
        if(!company) {
            throw new NotFoundError("Empresa não encontrada");
        }
        
        order.empresa = company;

        const paymentMethod = await this.paymentMethodRepository.getById(order.formaPagamento.id!);
        if(!paymentMethod) {
            throw new NotFoundError("Método de pagamento não encontrado");
        }

        order.formaPagamento = paymentMethod;

        for (let item of order.items) {
            const produto = await this.productRepository.getById(item.produto.id!) 
            if (!produto) {
                throw new NotFoundError(`Produto não encontrado`);
            }
            item.produto = produto;
        }

        order.data = new Date();

        await this.orderRepository.save(order);
    }

    async search(query: QueryParamsOrder): Promise<Order[]> {
        return this.orderRepository.search(query);
    }
}