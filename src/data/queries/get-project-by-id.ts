import { db } from "../db/client";
import { eq, and } from "drizzle-orm";
import { projects } from "../db/schema";
import { getCurrentUser } from "@/lib/auth";

export async function getProjectById(projectId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	const [project] = await db
		.select({
			id: projects.id,
			name: projects.name,
			userId: projects.userId,
			createdAt: projects.createdAt,
			updatedAt: projects.updatedAt,
		})
		.from(projects)
		.where(and(eq(projects.userId, user.id), eq(projects.id, projectId)))
		.limit(1);

	if (!project) {
		return null;
	}

	return project;
}
