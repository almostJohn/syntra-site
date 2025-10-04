"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { projects, notifications } from "@/db/schema";
import { auth } from "@/lib/auth";
import { generateUUID } from "@/lib/crypto";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import {
	createNotificationMessage,
	getFormString,
	sanitizeString,
} from "@/lib/utils";

type ProjectErrors = {
	name: string;
};

type ProjectValues = {
	name: string;
};

export async function createProject(
	_prevState: ActionResponse<ProjectErrors, ProjectValues>,
	formData: FormData,
): Promise<ActionResponse<ProjectErrors, ProjectValues>> {
	return serverActionCallback(
		async (): Promise<ActionResponse<ProjectErrors, ProjectValues>> => {
			const user = await auth.getCurrentUser();

			if (!user) {
				return {
					errorMessage: "You must be logged in to perform this action.",
				};
			}

			const rawName = getFormString(formData, "name") ?? "";

			const name = sanitizeString(rawName);

			if (!name) {
				return {
					errorMessage: "Name is required.",
					errors: {
						name: "Name is a required field.",
					},
				};
			}

			if (name.length < NAME_MIN_LENGTH) {
				return {
					errorMessage: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
					errors: {
						name: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
					},
					values: {
						name: rawName,
					},
				};
			}

			if (name.length > NAME_MAX_LENGTH) {
				return {
					errorMessage: `Name must not exceed ${NAME_MAX_LENGTH} characters.`,
					errors: {
						name: `Name must not exceed ${NAME_MAX_LENGTH} characters.`,
					},
					values: {
						name: rawName,
					},
				};
			}

			const [newProject] = await db
				.insert(projects)
				.values({
					id: generateUUID(),
					userId: user.id,
					name,
				})
				.returning();

			if (newProject) {
				await db.insert(notifications).values({
					id: generateUUID(),
					userId: user.id,
					content: createNotificationMessage("created", "project"),
				});
			}

			revalidatePath("/app");

			return {
				successMessage: "Project successfully created.",
			};
		},
	);
}
