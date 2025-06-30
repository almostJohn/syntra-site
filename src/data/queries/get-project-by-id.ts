import { eq, and } from "drizzle-orm";
import { db } from "../db/client";
import { projects } from "../db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";

export async function getProjectById(projectId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	const [project] = await db
		.select({
			id: projects.id,
			name: projects.name,
			createdAt: projects.createdAt,
			userId: projects.userId,
		})
		.from(projects)
		.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
		.limit(1);

	return project;
}
