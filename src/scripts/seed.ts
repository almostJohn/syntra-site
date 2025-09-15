import "dotenv/config.js";
import { db } from "@/db/sql";
import { users } from "@/db/schema";
import { generateUUID, hashString } from "@/lib/crypto";
import { generateTag } from "@/lib/utils";
import { eq } from "drizzle-orm";

(async () => {
	try {
		console.log("[seed] Started seeding...");

		const username = process.env.APP_LOCAL_USERNAME!;
		const password = process.env.APP_LOCAL_PASSWORD!;
		const displayName = process.env.APP_LOCAL_DISPLAY_NAME!;

		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (existingUser) {
			console.log("[seed] User already exists, skipping...");
			process.exit(1);
		}

		const hashedPassword = await hashString(password, 12);

		await db.insert(users).values({
			id: generateUUID(),
			username,
			userTag: generateTag(),
			displayName,
			password: hashedPassword,
		});

		console.log(`[seed] Successfully seeded user ${username}`);
		process.exit(0);
	} catch (error_) {
		const error = error_ as Error;
		console.error("[seed] Failed: ", error.message, error);
		process.exit(1);
	}
})();
