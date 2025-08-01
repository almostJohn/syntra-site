"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { tasks, projects, auditLogs, notifications } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { getFormValue } from "@/lib/get-form-value";
import { generateId } from "@/lib/generate-id";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";

export async function createTask(
	_prevState: ActionResponse,
	formData: FormData,
	projectId: string,
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE",
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const taskName = getFormValue(formData, "taskName");

		if (!taskName) {
			return {
				errorMessage: "Task name is required.",
			};
		}

		if (taskName.length < NAME_MIN_LENGTH) {
			return {
				errorMessage: `Task name must be at least ${NAME_MIN_LENGTH} characters.`,
			};
		}

		if (taskName.length > NAME_MAX_LENGTH) {
			return {
				errorMessage: `Task name must not exceed ${NAME_MAX_LENGTH} characters.`,
			};
		}

		const [project] = await db
			.select({
				id: projects.id,
				name: projects.name,
			})
			.from(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.limit(1);

		if (!project) {
			return {
				errorMessage: "Project not found.",
			};
		}

		const [newTask] = await db
			.insert(tasks)
			.values({
				id: generateId(),
				name: taskName,
				status,
				userId: user.id,
				projectId: project.id,
			})
			.returning();

		if (newTask) {
			await db.insert(auditLogs).values({
				id: generateId(),
				title: "Task Created",
				description: `Task "${newTask.name}" (${newTask.id}) was created within the project "${project.name}" (${project.id})`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: generateId(),
				description: `Task "${newTask.name}" (${newTask.id}) was created within the project "${project.name}" (${project.id})`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath(`/app/projects/${project.id}`);

		return {
			successMessage: "Task was successfully created.",
		};
	});
}
