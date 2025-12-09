"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/db/sql";
import {
	tasks as tasksTable,
	notifications as notificationsTable,
	projects as projectsTable,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { type ActionState, MessageType } from "@/types";
import { request } from "@/lib/request";
import { randomUUID } from "@/lib/utils";

const TASK_NAME_MIN_LENGTH = 3;
const TASK_NAME_MAX_LENGTH = 100;
const TASK_DESCRIPTION_MIN_LENGTH = 3;
const TASK_DESCRIPTION_MAX_LENGTH = 300;

export async function createTask(
	_: ActionState,
	form: FormData,
	projectId: string,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			type: MessageType.Error,
			message: "You must be logged in to create a task.",
		};
	}

	const name = form.get("name") as string;
	const description = form.get("description") as string;

	if (!name || !description) {
		return {
			type: MessageType.Error,
			message: "Name and description are required.",
		};
	}

	if (
		name.length < TASK_NAME_MIN_LENGTH ||
		name.length > TASK_NAME_MAX_LENGTH
	) {
		return {
			type: MessageType.Error,
			message: "Invalid task name.",
		};
	}

	if (
		description.length < TASK_DESCRIPTION_MIN_LENGTH ||
		description.length > TASK_DESCRIPTION_MAX_LENGTH
	) {
		return {
			type: MessageType.Error,
			message: "Invalid task description.",
		};
	}

	try {
		const { data: response } = await request.get({
			fn: async () => {
				const [project] = await db
					.select()
					.from(projectsTable)
					.where(
						and(
							eq(projectsTable.id, projectId),
							eq(projectsTable.userId, currentUser.id),
						),
					)
					.limit(1);

				return { project };
			},
		});

		if (!response?.project) {
			return {
				type: MessageType.Error,
				message: "Project not found.",
			};
		}

		await request.post({
			body: { name, description },
			fn: async ({ body }) => {
				await db.insert(tasksTable).values({
					id: randomUUID(),
					name: body!.name,
					description: body!.description,
					status: "todo",
					projectId: response.project.id,
					userId: currentUser.id,
				});

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: `Task "${body!.name}" has been successfully created within the project name "${response.project.name}".`,
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/projects");
		revalidatePath(`/dashboard/projects/${response.project.id}`);

		return {
			type: MessageType.Success,
			message: "Task created successfully.",
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			type: MessageType.Error,
			message,
		};
	}
}
