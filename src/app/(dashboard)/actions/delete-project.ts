"use server";

import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { projects, notifications } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";

export async function deleteProject(projectId: string) {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [deletedProject] = await db
			.delete(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			type: "DELETE_PROJECT",
			description: `Project "${deletedProject.name}" has been deleted.`,
		});

		return {
			successMessage: `Project "${deletedProject.name}" was successfully deleted.`,
		};
	});
}
