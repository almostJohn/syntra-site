"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { notifications, projects } from "@/data/db/schema";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getFormValue } from "@/lib/get-form-value";
import {
	PROJECT_NAME_MAX_LENGTH,
	PROJECT_NAME_MIN_LENGTH,
} from "@/lib/constants";

export async function createProject(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
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

		if (projectName.length < PROJECT_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Project name must be at least ${PROJECT_NAME_MIN_LENGTH} characters long.`,
				errors: {
					projectName: `Project name must be at least ${PROJECT_NAME_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (projectName.length > PROJECT_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Project name exceeds the maximum allowed length of ${PROJECT_NAME_MAX_LENGTH} characters.`,
				errors: {
					projectName: `Project name exceeds the maximum allowed length of ${PROJECT_NAME_MAX_LENGTH} characters.`,
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
