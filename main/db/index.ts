import fs from "fs";
import { app } from "electron";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const userDataPath = app.getPath("userData");
const dest = path.join(userDataPath, "sqlite.db");
const src = path.join(__dirname, "../main/db/sqlite.db");

interface MetadataRow {
  value: string;
}

function getDatabaseVersion(db: Database.Database): number {
  try {
    const tableExists = db
      .prepare(
        "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'metadata'"
      )
      .get();

    if (!tableExists) return 0;

    const result = db
      .prepare("SELECT value FROM metadata WHERE key = 'version'")
      .get() as MetadataRow | undefined;

    return result ? parseInt(result.value, 10) : 0;
  } catch (e) {
    console.error("Error checking database version:", e);
    return 0;
  }
}

function getSourceDbVersion(): number {
  const tempDb = new Database(src, { readonly: true });
  const version = getDatabaseVersion(tempDb);
  tempDb.close();
  return version;
}

let shouldCopy = false;

if (!fs.existsSync(dest)) {
  shouldCopy = true;
} else {
  const destDb = new Database(dest);
  const currentVersion = getDatabaseVersion(destDb);
  const sourceVersion = getSourceDbVersion();
  destDb.close();

  if (sourceVersion > currentVersion) {
    shouldCopy = true;
  }
}

if (shouldCopy) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const sqlite = new Database(dest);
export const db = drizzle(sqlite);
