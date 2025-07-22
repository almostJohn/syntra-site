"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { projects, auditLogs, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { getFormValue } from "@/lib/get-form-value";

export async function createProject(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const projectName = getFormValue(formData, "projectName");

		if (!projectName) {
			return {
				errorMessage: "Project name is required.",
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

		const [newProject] = await db
			.insert(projects)
			.values({
				id: crypto.randomUUID(),
				name: projectName,
				userId: user.id,
			})
			.returning();

		if (newProject) {
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "Project Created",
				description: `Project "${newProject.name}" (${newProject.id}) was created.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `Project "${newProject.name}" (${newProject.id}) was created.`,
				userId: user.id,
			});
		}

		revalidatePath("/app");

		return {
			successMessage: `Project was successfully created.`,
		};
	});
}
