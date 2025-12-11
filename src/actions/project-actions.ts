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
import { and, eq } from "drizzle-orm";

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

export async function renameProject(
	newName: string,
	projectId: string,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			type: MessageType.Error,
			message: "You must be logged in to perform this action.",
		};
	}

	newName = newName.trim();

	if (!newName) {
		return {
			type: MessageType.Error,
			message: "New name is required.",
		};
	}

	if (
		newName.length < PROJECT_NAME_MIN_LENGTH ||
		newName.length > PROJECT_NAME_MAX_LENGTH
	) {
		return {
			type: MessageType.Error,
			message: "Invalid project name.",
		};
	}

	try {
		await request.post({
			body: { newName, projectId },
			fn: async ({ body }) => {
				await db
					.update(projectsTable)
					.set({
						name: enforceCasing(body!.newName),
						updatedAt: new Date(),
					})
					.where(
						and(
							eq(projectsTable.id, body!.projectId),
							eq(projectsTable.userId, currentUser.id),
						),
					);

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: `Project has been successfully renamed to "${body!.newName}".`,
					isRead: false,
				});
			},
		});

		return {
			type: MessageType.Success,
			message: "Project renamed successfully.",
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

export async function deleteProject(projectId: string): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			type: MessageType.Error,
			message: "You must be logged in to perform this action.",
		};
	}

	try {
		await request.post({
			body: { projectId },
			fn: async ({ body }) => {
				const [deletedProject] = await db
					.delete(projectsTable)
					.where(
						and(
							eq(projectsTable.id, body!.projectId),
							eq(projectsTable.userId, currentUser.id),
						),
					)
					.returning();

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: `Project "${deletedProject.name}" has been successfully deleted.`,
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/projects");
		revalidatePath(`/dashboard/projects/${projectId}`);

		return {
			type: MessageType.Success,
			message: "Project successfully deleted.",
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
