import { User } from "../models/users.models";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
