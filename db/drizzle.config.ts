// db/drizzle.config.ts

import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  dbCredentials: {
    url: `file:${path.join(__dirname, "sqlite.db")}`.replace(/\\/g, "/"),
  },
});
