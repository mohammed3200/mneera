import { db } from "@/main/db";
import { battalions } from "@/main/db/schema";
import { eq } from "drizzle-orm";
import type { Battalion, NewBattalion } from "@/main/db/schema-types";

export class BattalionsRepository {
  async create(data: NewBattalion): Promise<Battalion> {
    const result = await db.insert(battalions).values(data).returning();
    return result[0];
  }
  async getById(id: number): Promise<Battalion | undefined> {
    const result = await db
      .select()
      .from(battalions)
      .where(eq(battalions.id, id));
    return result[0];
  }
  async getAll(): Promise<Battalion[]> {
    return db.select().from(battalions).all();
  }
}
