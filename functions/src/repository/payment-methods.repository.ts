import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { converterPaymentMethod, PaymentMethod } from "../models/payment-methods.models.js";

export class PaymentMethodsRepository {

    private collection: CollectionReference<PaymentMethod>;

    constructor() {
        this.collection = getFirestore().collection("payment-methods").withConverter(converterPaymentMethod);
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getById(id: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async save(paymentMethod: PaymentMethod): Promise<void> {
        await this.collection.add(paymentMethod);
    }

    async updateById(paymentMethod: PaymentMethod): Promise<void> {

        await this.collection.doc(paymentMethod.id).set(paymentMethod); 
        
    }

    async deleteById(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}