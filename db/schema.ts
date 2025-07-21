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
  image: text("image_id").notNull(),
  nationalNumber: text("national_number").notNull().unique(),
  birthDate: integer("birth_date", { mode: "number" }).notNull(),
  idNumber: text("id_number").unique(),
  passportNumber : text("passport_number").unique(),
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

export const images = sqliteTable('Image', {
  id: integer('id').primaryKey(),      // use cuid() in your application for default
  data: blob('data'),                // BLOB in SQLite
  type: text('type'),                // MIME type or custom type string
  size: integer('size'),             // file size in bytes
  createdAt: integer('created_at', { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

