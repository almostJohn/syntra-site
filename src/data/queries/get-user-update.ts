import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schema";

export async function getUserUpdate(userId: string) {
	const result = await db
		.select({
			displayName: users.displayName,
			createdAt: users.createdAt,
			updatedAt: users.updatedAt,
		})
		.from(users)
		.where(eq(users.id, userId))
		.orderBy(desc(users.createdAt))
		.limit(1);

	const user = result[0];

	if (!user) {
		return [];
	}

	const isCreated = user.createdAt.getTime() === user.updatedAt.getTime();

	return [
		{
			id: userId,
			type: isCreated
				? "USER_CREATE"
				: ("USER_UPDATE" as "USER_CREATE" | "USER_UPDATE"),
			createdAt: isCreated ? user.createdAt : user.updatedAt,
		},
	];
}
