import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category, categoryConverter } from "../models/category.models.js";

export class CategoryRepository {

  private collection: CollectionReference<Category>;

  constructor() {
    this.collection = getFirestore()
    .collection("categories")
    .withConverter(categoryConverter);
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());  
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

    await this.collection.doc(category.id).set(category);
  }

  async deleteById(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}