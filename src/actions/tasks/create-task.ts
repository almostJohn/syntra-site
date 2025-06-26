"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { tasks, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from "@/lib/constants";

export async function createTask(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		const title = getFormValue(formData, "title") || "Untitled";
		const description = getFormValue(formData, "description");

		if (!description) {
			return {
				error: {
					statusCode: 400,
					message: "Description is a required field.",
				},
				errors: {
					description: "Description is a required field.",
				},
				values: {
					title,
				},
			};
		}

		if (title.length > TITLE_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				errors: {
					title: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				values: {
					description,
				},
			};
		}

		if (description.length > DESCRIPTION_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Description exceeds the maximum allowed length of ${DESCRIPTION_MAX_LENGTH} characters.`,
				},
				errors: {
					description: `Description exceeds the maximum allowed length of ${DESCRIPTION_MAX_LENGTH} characters.`,
				},
				values: {
					title,
				},
			};
		}

		const [newTask] = await db
			.insert(tasks)
			.values({
				id: crypto.randomUUID(),
				title,
				description,
				status: "INCOMPLETE",
				userId: user.id,
			})
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: newTask.id,
			type: "CREATE_TASK",
			description: `New task "${newTask.title || "Untitled"}" created.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			success: {
				statusCode: 201,
				message: "Task created successfully.",
			},
		};
	});
}
