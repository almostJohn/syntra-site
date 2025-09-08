import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/config/env";

const sql = postgres(env.DATABASE_URL, { max: 10 });

export const db = drizzle(sql, { schema });
