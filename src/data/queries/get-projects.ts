import { db } from "../db/client";
import { eq, desc } from "drizzle-orm";
import { projects } from "../db/schema";

export async function getProjects(userId: string) {
	return await db
		.select({
			id: projects.id,
			name: projects.name,
			userId: projects.userId,
			createdAt: projects.createdAt,
			updatedAt: projects.updatedAt,
		})
		.from(projects)
		.where(eq(projects.userId, userId))
		.orderBy(desc(projects.createdAt));
}
