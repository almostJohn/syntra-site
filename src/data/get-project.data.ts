import "server-only";
import { db } from "@/db/sql";
import { eq, and, desc } from "drizzle-orm";
import { projects as projectsTable } from "@/db/schema";

export type Project = {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getProjectById(
	projectId: string,
	userId: string,
): Promise<Project | null> {
	try {
		const [raw_project] = await db
			.select()
			.from(projectsTable)
			.where(
				and(eq(projectsTable.id, projectId), eq(projectsTable.userId, userId)),
			)
			.limit(1);

		return raw_project;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function getProjects(userId: string): Promise<Project[]> {
	try {
		const raw_projects = await db
			.select()
			.from(projectsTable)
			.where(eq(projectsTable.userId, userId))
			.orderBy(desc(projectsTable.createdAt));

		return raw_projects;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return [];
	}
}
