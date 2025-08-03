// main/repositories/IndividualRepository.ts
import { db } from "@/main/db";
import { individuals } from "@/main/db/schema";
import { eq } from "drizzle-orm";
import type { Individual, NewIndividual } from "@/main/db/schema-types";
import { UniqueConstraintError } from "../../errors/UniqueConstraintError";

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
    try {
      const result = await db.insert(individuals).values(data).returning();
      return result[0];
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("national_number")) {
          throw new UniqueConstraintError(
            "An individual with this national number already exists.",
            "ERR_UNIQUE_NATIONAL_NUMBER"
          );
        }
        if (error.message.includes("id_number")) {
          throw new UniqueConstraintError(
            "An individual with this ID number already exists.",
            "ERR_UNIQUE_ID_NUMBER"
          );
        }
        if (error.message.includes("passport_number")) {
          throw new UniqueConstraintError(
            "An individual with this passport number already exists.",
            "ERR_UNIQUE_PASSPORT_NUMBER"
          );
        }
      }
      throw error;
    }
  }
}
