// main/repositories/IndividualRepository.ts
import { db } from "../db";
import { individuals } from "../db/schema";
import { eq } from "drizzle-orm";
import type { Individual, NewIndividual } from "../db/schema-types";

export class IndividualRepository {
  async getAll(): Promise<Individual[]> {
    return db.select().from(individuals).all();
  }

  async getById(id: number): Promise<Individual | undefined> {
    const result = await db
      .select()
      .from(individuals)
      .where(eq(individuals.id, id));
    return result[0];
  }

  async getByBattalionId(battalionId: number): Promise<Individual[]> {
    return db
      .select()
      .from(individuals)
      .where(eq(individuals.battalionId, battalionId))
      .all();
  }

  async create(data: NewIndividual): Promise<Individual> {
    const result = await db.insert(individuals).values(data).returning();
    return result[0];
  }
}
