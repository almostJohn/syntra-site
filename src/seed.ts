import { config } from "dotenv";
import { db } from "./db/sql";
import { users as usersTable } from "./db/schema";
import { request } from "./lib/request";
import { eq } from "drizzle-orm";
import { randomUUID } from "./lib/utils";
import { hashText } from "./lib/utils";

config();

(async () => {
	try {
		console.log("[SEED Request Starting...]");

		const username = process.env.APP_SEED_USERNAME!;
		const displayName = process.env.APP_SEED_DISPLAY_NAME!;
		const password = process.env.APP_SEED_PASSWORD!;

		const { data: response } = await request.get({
			action: async () => {
				const [user] = await db
					.select({ id: usersTable.id, username: usersTable.username })
					.from(usersTable)
					.where(eq(usersTable.username, username))
					.limit(1);

				return {
					user: {
						id: user.id,
						username: user.username,
					},
				};
			},
		});

		if (response?.user) {
			console.error("[SEED Request Error]: User already exists");
			process.exit(1);
		}

		await request.post({
			body: { username, password, displayName },
			action: async ({ body }) => {
				const hashedPassword = await hashText(body!.password, 12);
				await db.insert(usersTable).values({
					id: randomUUID(),
					username: body!.username,
					password: hashedPassword,
					displayName: body!.displayName,
				});
			},
		});

		console.log("[SEED Request Done]: Exiting...");
		process.exit(0);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		console.error("[SEED Request Error]", message, error);
		process.exit(1);
	}
})();
