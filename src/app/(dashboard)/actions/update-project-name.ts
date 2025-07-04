"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { projects, notifications } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";
import {
	PROJECT_NAME_MAX_LENGTH,
	PROJECT_NAME_MIN_LENGTH,
} from "@/lib/constants";

export async function updateProjectName(
	projectId: string,
	projectName: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (projectName.length < PROJECT_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Project name must be at least ${PROJECT_NAME_MIN_LENGTH} characters long.`,
			};
		}

		if (projectName.length > PROJECT_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Project name exceeds the maximum allowed length of ${PROJECT_NAME_MAX_LENGTH} characters.`,
			};
		}

		const [updatedProject] = await db
			.update(projects)
			.set({
				name: projectName,
				updatedat: new Date(),
			})
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			projectId: updatedProject.id,
			type: "UPDATE_PROJECT",
			description: `Project "${updatedProject.name}" has been updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${updatedProject.id}`);
		revalidatePath(`/dashboard/projects/${updatedProject.id}/settings`);

		return {
			successMessage: `Project "${updatedProject.name}" was successfully updated.`,
		};
	});
}
