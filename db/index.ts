import { app } from "electron";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from 'drizzle-orm/better-sqlite3';


let dbPath = "sqlite.db";
if (app) {
  dbPath = path.join(app.getPath("userData"), "sqlite.db");
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);