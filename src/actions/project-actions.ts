"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/sql";
import {
	projects as projectsTable,
	notifications as notificationsTable,
} from "@/db/schema";
import { type ActionState, MessageType } from "@/types";
import { request } from "@/lib/request";
import { enforceCasing, randomUUID } from "@/lib/utils";
import { auth } from "@/lib/auth";

const PROJECT_NAME_MIN_LENGTH = 3;
const PROJECT_NAME_MAX_LENGTH = 64;

export async function createProject(
	_: ActionState,
	form: FormData,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to create a project.",
			type: MessageType.Error,
		};
	}

	const name = form.get("name") as string;

	if (!name) {
		return {
			message: "Project name is required.",
			type: MessageType.Error,
		};
	}

	if (
		name.length < PROJECT_NAME_MIN_LENGTH ||
		name.length > PROJECT_NAME_MAX_LENGTH
	) {
		return {
			message: "Invalid project name.",
			type: MessageType.Error,
		};
	}

	try {
		await request.post({
			body: { name },
			fn: async ({ body }) => {
				await db.insert(projectsTable).values({
					id: randomUUID(),
					name: enforceCasing(body!.name),
					userId: currentUser.id,
				});

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: `Project "${body!.name}" has been created successfully.`,
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");

		return {
			message: "Project created successfully.",
			type: MessageType.Success,
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			message,
			type: MessageType.Error,
		};
	}
}
