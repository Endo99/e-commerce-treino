import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.models.js";

export class CategoryRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("categories");
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as Category[];
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as Category;
    } else {
      return null;
    }
  }

  async save(category: Category): Promise<void> {
    await this.collection.add(category);
  }

  async updateById(category: Category): Promise<void> {

    let docRef = this.collection.doc(category.id!);

    await docRef.set({
      descricao: category.descricao,
      ativa: category.ativa
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}