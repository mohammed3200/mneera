// main/db/drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
  dialect: "sqlite",
  schema: "./main/db/schema.ts",
  out: "./main/db/drizzle",
  dbCredentials: {
    // Just use a relative path for dev time
    url: `file:${path.resolve(__dirname, "sqlite.db")}`.replace(/\\/g, "/"),
  },
});
