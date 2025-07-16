import { ErrorBase } from "./base.errors";


export class InternalServerError extends ErrorBase {

    constructor(message = "Erro Interno do Servidor") {
        super(500, message);
    }
}