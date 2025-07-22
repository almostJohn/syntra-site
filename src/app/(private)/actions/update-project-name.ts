"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { projects, auditLogs, notifications } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";

export async function updateProjectName(
	projectId: string,
	projectName: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		if (projectName.length < NAME_MIN_LENGTH) {
			return {
				errorMessage: `Project name too short (min ${NAME_MIN_LENGTH} chars).`,
			};
		}

		if (projectName.length > NAME_MAX_LENGTH) {
			return {
				errorMessage: `Project name too long (max ${NAME_MAX_LENGTH} chars).`,
			};
		}

		const [updatedProject] = await db
			.update(projects)
			.set({
				name: projectName,
				updatedAt: new Date(),
			})
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.returning();

		if (updatedProject) {
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "Project Updated",
				description: `Project "${updatedProject.name}" (${updatedProject.id}) was updated.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `Project "${updatedProject.name}" (${updatedProject.id}) was updated.`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath(`/app/projects`);
		revalidatePath(`/app/projects/${updatedProject.id}`);
		revalidatePath(`/app/projects/${updatedProject.id}/settings`);

		return {
			successMessage: "Project was successfully updated.",
		};
	});
}
