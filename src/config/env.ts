import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),

	// App credentials
	APP_URL: z.string().url(),
	APP_SECRET_KEY: z.string().min(1, "APP_SECRET_KEY is required"),
	APP_COOKIE_NAME: z.string().min(1, "APP_COOKIE_NAME is required"),

	// Database url
	DATABASE_URL: z.string().url(),

	// Database credentials for seeding
	APP_LOCAL_USERNAME: z.string().min(1, "APP_LOCAL_USERNAME is required"),
	APP_LOCAL_PASSWORD: z.string().min(1, "APP_LOCAL_PASSWORD is required"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("Invalid environment variables: ", _env.error.format());
	throw new Error("Invalid environment variables");
}

export const env = _env.data;
