"use server";

import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { eq, and } from "drizzle-orm";
import { projects, auditLogs, notifications } from "@/data/db/schema";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";

export async function deleteProject(projectId: string) {
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
				id: crypto.randomUUID(),
				title: "Project Deleted",
				description: `Project "${deletedProject.name}" was deleted.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `Project "${deletedProject.name}" was deleted.`,
				userId: user.id,
			});
		}

		return {
			successMessage: "Project was successfully deleted.",
		};
	});
}
