import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const dbPath = "./sqlite.db";
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
