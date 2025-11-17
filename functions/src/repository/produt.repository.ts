import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { converterProduct, Product } from "../models/product.models.js";

export class ProductRepository {

  private collection: CollectionReference<Product>;

  constructor() {
    this.collection = getFirestore().collection("products").withConverter(converterProduct);
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async search(categoriaId: string): Promise<Product[]> {
    const snapshot = await this.collection.where("categoria.id", "==", categoriaId).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get();

    return doc.data() ?? null;
  }

  async save(product: Product): Promise<void> {
    await this.collection.add(product);
  }

  async updateById(product: Product): Promise<void> {

    await this.collection.doc(product.id).set(product);
  }

  async deleteById(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  async getCountByCategoria(categoriaId: string): Promise<number> {
    const countSnapshot = await this.collection.where("categoria.id", "==", categoriaId).count().get();
    return countSnapshot.data().count;
  }
}