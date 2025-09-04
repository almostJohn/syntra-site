import { generateId } from "@/utils";
import { db, tasks } from "@/db";
import type { Task } from "@/types/task.types";
import { and, desc, eq } from "drizzle-orm";
import { type APIResponse, APIStatus } from "@/types/api.types";

export class TaskService {
	static async create(data: {
		name: string;
		description?: string | null;
		status: "incomplete" | "in_progress" | "complete";
		priority: "critical" | "high" | "medium" | "low" | "backlog";
		category:
			| "bug"
			| "feature"
			| "chore"
			| "docs"
			| "infra"
			| "refactor"
			| "testing"
			| "design"
			| "research"
			| "spec"
			| "marketing"
			| "sales"
			| "support"
			| "ops"
			| "finance"
			| "planning"
			| "meeting";
		projectId: string;
		userId: string;
		assignedTo?: string | null;
	}): Promise<APIResponse<Task>> {
		try {
			const [rawTask] = await db
				.insert(tasks)
				.values({
					...data,
					id: generateId(),
					description: data.description?.trim() ?? "",
					assignedTo: data.assignedTo?.trim() || null,
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawTask,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getAll(
		projectId: string,
		userId: string,
	): Promise<APIResponse<Task[]>> {
		try {
			const rawTasks = await db
				.select()
				.from(tasks)
				.where(and(eq(tasks.projectId, projectId), eq(tasks.userId, userId)))
				.orderBy(desc(tasks.createdAt));

			return {
				status: APIStatus.Success,
				data: rawTasks,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(
		projectId: string,
		userId: string,
	): Promise<APIResponse<Task>> {
		try {
			const [rawTask] = await db
				.select()
				.from(tasks)
				.where(and(eq(tasks.projectId, projectId), eq(tasks.userId, userId)))
				.limit(1);

			if (!rawTask) {
				return {
					status: APIStatus.NotFound,
					error: "Task not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawTask,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async update(
		taskId: string,
		projectId: string,
		userId: string,
		data: {
			name: string;
			description?: string | null;
			status: "incomplete" | "in_progress" | "complete";
			priority: "critical" | "high" | "medium" | "low" | "backlog";
			category: "bug" | "feature" | "chore" | "docs" | "infra";
		},
	): Promise<APIResponse<Task>> {
		try {
			const normalRawData = {
				...data,
				description:
					data.description !== undefined
						? data.description?.trim() || ""
						: undefined,
			};

			const updatedData = Object.fromEntries(
				// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
				Object.entries(normalRawData).filter(([_, v]) => v !== undefined),
			);

			if (Object.keys(updatedData).length === 0) {
				return {
					status: APIStatus.ValidationError,
					error: "No fields provided for update",
				};
			}

			const [rawUpdatedTask] = await db
				.update(tasks)
				.set({
					...updatedData,
					updatedAt: new Date(),
				})
				.where(
					and(
						eq(tasks.id, taskId),
						eq(tasks.projectId, projectId),
						eq(tasks.userId, userId),
					),
				)
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUpdatedTask,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async assignToUser(
		taskId: string,
		projectId: string,
		userId: string,
		assignedTo: string | null,
	): Promise<APIResponse<Task>> {
		try {
			const [updatedTask] = await db
				.update(tasks)
				.set({
					assignedTo: assignedTo?.trim() || null,
					updatedAt: new Date(),
				})
				.where(
					and(
						eq(tasks.id, taskId),
						eq(tasks.projectId, projectId),
						eq(tasks.userId, userId),
					),
				)
				.returning();

			if (!updatedTask) {
				return {
					status: APIStatus.NotFound,
					error: "Task not found or you don't have permission to assign it",
				};
			}

			return {
				status: APIStatus.Success,
				data: updatedTask,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async delete(
		taskId: string,
		projectId: string,
		userId: string,
	): Promise<APIResponse<Task>> {
		try {
			const [rawDeletedTask] = await db
				.delete(tasks)
				.where(
					and(
						eq(tasks.id, taskId),
						eq(tasks.projectId, projectId),
						eq(tasks.userId, userId),
					),
				)
				.returning();

			return {
				status: APIStatus.Success,
				data: rawDeletedTask,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
