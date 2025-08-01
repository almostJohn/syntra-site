"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { projects, auditLogs, notifications } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { generateId } from "@/lib/generate-id";

export async function deleteProject(
	projectId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const [deletedProject] = await db
			.delete(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.returning();

		if (deletedProject) {
			await db.insert(auditLogs).values({
				id: generateId(),
				title: "Project Deleted",
				description: `Project "${deletedProject.name}" was deleted.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: generateId(),
				description: `Project "${deletedProject.name}" was deleted.`,
				userId: user.id,
			});
		}

		return {
			successMessage: "Project was successfully deleted.",
		};
	});
}
