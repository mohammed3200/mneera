import fs from "fs";
import { app } from "electron";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const userDataPath = app.getPath("userData");
const dest = path.join(userDataPath, "sqlite.db");
const src = path.join(__dirname, "../main/db/sqlite.db");

if (!fs.existsSync(dest)) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const sqlite = new Database(dest);
export const db = drizzle(sqlite);
