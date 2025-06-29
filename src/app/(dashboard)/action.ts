"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { notifications, projects } from "@/data/db/schema";
import { deleteCookie } from "@/lib/auth/cookies";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";

export async function logout() {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}

export async function markNotificationsAsArchived() {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await db
			.update(notifications)
			.set({ isArchived: true })
			.where(
				and(
					eq(notifications.userId, user.id),
					eq(notifications.isArchived, false),
				),
			);

		revalidatePath("/dashboard");

		return {
			successMessage: "Notifications was archived successfully.",
		};
	});
}

export async function createProject(
	_prevState: ActionResponse,
	formData: FormData,
) {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const projectName = getFormValue(formData, "project_name");

		if (!projectName) {
			return {
				errorMessage: "Project name is a required field.",
				errors: {
					projectName: "Project name is a required field.",
				},
			};
		}

		if (projectName.length < NAME_MIN_LENGTH) {
			return {
				errorMessage: `Project name must be at least ${NAME_MIN_LENGTH} characters long.`,
				errors: {
					projectName: `Project name must be at least ${NAME_MIN_LENGTH} characters long.`,
				},
				values: {
					project_name: projectName,
				},
			};
		}

		if (projectName.length > NAME_MAX_LENGTH) {
			return {
				errorMessage: `Project name exceeds the maximum allowed length of ${NAME_MAX_LENGTH} characters.`,
				errors: {
					projectName: `Project name exceeds the maximum allowed length of ${NAME_MAX_LENGTH} characters.`,
				},
				values: {
					project_name: projectName,
				},
			};
		}

		const [newProject] = await db
			.insert(projects)
			.values({
				id: crypto.randomUUID(),
				name: projectName,
				userId: user.id,
			})
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			projectId: newProject.id,
			type: "CREATE_PROJECT",
			description: `New project "${newProject.name}" has been created.`,
		});

		revalidatePath("/dashboard");

		return {
			successMessage: `New project "${newProject.name}" was successfully created.`,
		};
	});
}
