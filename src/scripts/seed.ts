import "dotenv/config.js";
import { UserService } from "@/services";
import { generateUserTag, hashString } from "@/utils";

(async () => {
	try {
		console.log("[seed] Started seeding...");

		const username = process.env.APP_LOCAL_USERNAME!; // use your own environment
		const password = process.env.APP_LOCAL_PASSWORD!; // use your own environment
		const displayName = process.env.APP_LOCAL_DISPLAY_NAME!; // use your own environment

		const { data: existingUser } = await UserService.getByUsername(username);
		if (existingUser) {
			console.log("[seed] User already exists, skipping...");
			process.exit(1);
		}

		const hashedPassword = await hashString(password, 12);

		await UserService.create({
			username,
			userTag: generateUserTag(),
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
