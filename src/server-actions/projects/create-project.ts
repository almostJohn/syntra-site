"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import {
	notifications as notificationsTable,
	projects as projectsTable,
} from "@/db/schema";
import {
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
	ErrorResponses,
} from "@/lib/constants";
import {
	createNotificationMessage,
	getFormString,
	sanitizeString,
} from "@/lib/utils";
import { generateUUID } from "@/lib/crypto";

type CreateProjectErrors = {
	name?: string;
};

type CreateProjectValues = {
	name?: string;
};

export async function createProject(
	_prevState: ActionResponse<CreateProjectErrors, CreateProjectValues>,
	formData: FormData,
): Promise<ActionResponse<CreateProjectErrors, CreateProjectValues>> {
	return serverActionCallback(
		async (): Promise<
			ActionResponse<CreateProjectErrors, CreateProjectValues>
		> => {
			const loggedInUser = await auth.getCurrentUser();

			if (!loggedInUser) {
				return {
					errorMessage: ErrorResponses.unauthorized,
				};
			}

			const name = getFormString(formData, "name") || "";
			const sanitizedName = sanitizeString(name);

			if (!sanitizedName) {
				return {
					errorMessage: "Name is required.",
					errors: {
						name: "Name is required.",
					},
				};
			}

			if (sanitizedName.length > NAME_MAX_LENGTH) {
				return {
					errorMessage: `Name must not exceed ${NAME_MAX_LENGTH} characters.`,
					errors: {
						name: `Name must not exceed ${NAME_MAX_LENGTH} characters.`,
					},
				};
			}

			if (sanitizedName.length < NAME_MIN_LENGTH) {
				return {
					errorMessage: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
					errors: {
						name: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
					},
				};
			}

			const [newProject] = await db
				.insert(projectsTable)
				.values({
					id: generateUUID(),
					userId: loggedInUser.id,
					name: sanitizedName,
				})
				.returning();

			if (newProject) {
				await db.insert(notificationsTable).values({
					id: generateUUID(),
					userId: loggedInUser.id,
					content: createNotificationMessage("created", "project"),
				});
			}

			revalidatePath("/app");

			return {
				successMessage: "Project created successfully.",
			};
		},
	);
}
