import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { projects } from "../db/schema";

export async function getAllProjects(userId: string) {
	return await db
		.select({
			id: projects.id,
			name: projects.name,
			createdAt: projects.createdAt,
			userId: projects.userId,
		})
		.from(projects)
		.where(eq(projects.userId, userId))
		.orderBy(desc(projects.createdAt));
}
