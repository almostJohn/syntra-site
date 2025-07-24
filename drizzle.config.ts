import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

if (process.env.NODE_ENV !== "production") {
	config({ path: ".env.development" });
} else {
	config({ path: ".env.production" });
}

export default defineConfig({
	schema: "./src/data/db/schema.ts",
	out: "./drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
