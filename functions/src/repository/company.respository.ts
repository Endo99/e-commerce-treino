import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyConverter } from "../models/company.models.js";

export class CompanyRepository {

  private collection: CollectionReference<Company>;

  constructor() {
    this.collection = getFirestore()
      .collection("companies")
      .withConverter(companyConverter);

  }

  async getAll(): Promise<Company[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<Company | null> {
    const doc = await this.collection.doc(id).get();

    return doc.data() ?? null;
  }

  /*async create(company: Company): Promise<void> {
    delete company.password;
    await this.collection.doc(user.id).set({
      nome: user.nome,
      email: user.email
    });
  }*/

  async save(company: Company): Promise<void> {
    await this.collection.add(company);
  }

  async updateById(company: Company): Promise<void> {
    await this.collection
    .doc(company.id)
    .set(company);
  }
}