import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { converterOrder, Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class OrderRepository {

    private collection: CollectionReference<Order>;

    constructor() {
        this.collection = getFirestore()
            .collection('orders')
            .withConverter(converterOrder);
    }

    async save(order: Order) {

        const batch = getFirestore().batch();

        const orderRef = this.collection.doc();
        batch.create(orderRef, order);

        const itemsRef = orderRef.collection("items")
            .withConverter(orderItemConverter);
        for (let item of order.items!) {
            batch.create(itemsRef.doc(), item);
        }

        await batch.commit();

        /* const orderRef = await this.collection.add(order);
        for (let item of order.items) {
            await orderRef
            .collection("items")
            .withConverter(orderItemConverter)
            .add(item);

        } */
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        let query: FirebaseFirestore.Query<Order> = this.collection;

        if (queryParams.empresaId) {
            query = query.where('empresa.id', '==', queryParams.empresaId);
        }

        if (queryParams.status) {
            query = query.where('status', '==', queryParams.status);
        }

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).startOf("day").toDate();
            query = query.where('data', '>=', queryParams.dataInicio);
        }

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataInicio).endOf("day").toDate();
            query = query.where('data', '<=', queryParams.dataFim);
        }

        const snapshot = await query.get();

        return snapshot.docs.map(doc => doc.data());;
    }

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        const pedidoRef = this.collection.doc(pedidoId);
        const snapshot = await pedidoRef
            .collection("items")
            .withConverter(orderItemConverter)
            .get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getById(pedidoId: string): Promise<Order> {
        const order = (await this.collection.doc(pedidoId).get()).data();
        if (!order) {
            throw new NotFoundError("Pedido não encontrado!");
        }
        order.items = await this.getItems(pedidoId);
        return order;
    }

    async changeStatus(pedidoId: string, status: OrderStatus) {
        this.collection
        .withConverter(null)
        .doc(pedidoId)
        .set({
            status: status
        }, {
            merge: true
        });
    }
} 