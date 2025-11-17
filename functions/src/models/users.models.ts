import { Joi } from "celebrate";

export class User {
    id: string;
    nome: string;
    email: string;
    password?: string;

    constructor(data: User | any) {;
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.password = data.password;
    }
}

export const newUserSchema = Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
});

export const updateUserSchema = Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6)
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required()
})

export const converterUser = {
    toFirestore: (user: User): FirebaseFirestore.DocumentData => {
        return {
            nome: user.nome,
            email: user.email
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
        return new User({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}