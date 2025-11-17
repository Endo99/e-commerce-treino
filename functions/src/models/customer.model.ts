import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";
import { FirestoreDataConverter } from "firebase-admin/firestore";

export class Customer {
    nome: string;
    telefone: string;

    constructor(data: Customer | any) {
        this.nome = data.nome;
        this.telefone = data.telefone;
    }
};

export const customerSchema = Joi.object().keys({
    nome: Joi.string().trim().min(5).required(),
    telefone: Joi.string().regex(phoneRegexPattern).required()
})

export const customerConverter: FirestoreDataConverter<Customer> = {
    toFirestore: (customer: Customer): FirebaseFirestore.DocumentData => {
        return {
            nome: customer.nome,
            telefone: customer.telefone
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Customer => {
        const data = snapshot.data();
        return new Customer({
            nome: data.nome,
            ...snapshot.data()
        });
    }
};
