// db/schema.ts

import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const individuals = sqliteTable("individuals", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image_id"),
  nationalNumber: text("national_number").notNull().unique(),
  birthDate: integer("birth_date", { mode: "number" }).notNull(),
  idNumber: text("id_number").unique(),  // Nullable
  passportNumber: text("passport_number").unique(),  // Nullable
  address: text("address").notNull(),
  placeOfBirth: text("place_of_birth").notNull(),
  battalion: text("battalion").notNull(),
  phoneNumber: text("phone_number").notNull(),
  nationality: text("nationality").notNull(),
  bloodType: text("blood_type").notNull(),
  academicQualification: text("academic_qualification").notNull(),
  weaponType: text("weapon_type").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const images = sqliteTable("images", {  // Changed to lowercase
  id: text("id").primaryKey(),
  data: blob("data"),
  type: text("type"),
  size: integer("size"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});
