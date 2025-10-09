import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/users.models.js";

export class UserRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("users");
  }

  async getAll(): Promise<User[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    }) as User[];
  }

  async getById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    } else {
      return null;
    }
  }

  async create(user: User): Promise<void> {
    delete user.password;
    await this.collection.doc(user.id).set({
      nome: user.nome,
      email: user.email
    });
  }

  async save(user: User): Promise<void> {
    delete user.password;
    await this.collection.add(user);
  }

  async updateById(user: User): Promise<void> {

    let docRef = this.collection.doc(user.id);
    
    await docRef.set({
        nome: user.nome,
        email: user.email
      });
  }

  async deleteById(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}