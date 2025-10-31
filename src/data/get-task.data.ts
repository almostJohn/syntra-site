import "server-only";
import { db } from "@/db/sql";
import { eq, and, desc, sql } from "drizzle-orm";
import { tasks as tasksTable, users as usersTable } from "@/db/schema";

export type Author = {
	id: string;
	username: string;
	avatar: string | null;
};

export type TaskStatus = "backlog" | "todo" | "in_progress" | "complete";
export type TaskPriority = "critical" | "high" | "medium" | "low";
export type TaskCategory = "feature" | "bug" | "docs" | "refactor";
export type Task = {
	id: string;
	title: string;
	subtitle: string | null;
	content: string | null;
	status: TaskStatus;
	priority: TaskPriority;
	category: TaskCategory;
	createdAt: Date;
};

export type TaskWithAuthor = Task & { author: Author };

export async function getTaskById(
	taskId: string,
	projectId: string,
	userId: string,
): Promise<TaskWithAuthor | null> {
	try {
		const [raw_task_with_author] = await db
			.select({
				id: tasksTable.id,
				title: tasksTable.title,
				subtitle: tasksTable.subtitle,
				content: tasksTable.content,
				status: tasksTable.status,
				priority: tasksTable.priority,
				category: tasksTable.category,
				createdAt: tasksTable.createdAt,
				author: {
					id: usersTable.id,
					username: usersTable.username,
					avatar: usersTable.avatar,
				},
			})
			.from(tasksTable)
			.innerJoin(usersTable, eq(usersTable.id, tasksTable.userId))
			.where(
				and(
					eq(tasksTable.id, taskId),
					eq(tasksTable.projectId, projectId),
					eq(tasksTable.userId, userId),
				),
			)
			.limit(1);

		return raw_task_with_author;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function getTasksPaginated({
	taskId,
	projectId,
	userId,
	page = 1,
	limit = 10,
}: {
	taskId: string;
	projectId: string;
	userId: string;
	page: number;
	limit: number;
}) {
	try {
		const offset = (page - 1) * limit;

		const raw_data = await db
			.select({
				id: tasksTable.id,
				title: tasksTable.title,
				subtitle: tasksTable.subtitle,
				content: tasksTable.content,
				status: tasksTable.status,
				priority: tasksTable.priority,
				category: tasksTable.category,
				createdAt: tasksTable.createdAt,
				author: {
					id: usersTable.id,
					username: usersTable.username,
					avatar: usersTable.avatar,
				},
			})
			.from(tasksTable)
			.innerJoin(usersTable, eq(usersTable.id, tasksTable.userId))
			.where(
				and(
					eq(tasksTable.id, taskId),
					eq(tasksTable.projectId, projectId),
					eq(tasksTable.userId, userId),
				),
			)
			.orderBy(desc(tasksTable.createdAt))
			.limit(limit)
			.offset(offset);

		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(tasksTable);

		return {
			data: raw_data,
			pagination: {
				page,
				limit,
				total: count,
				totalPages: Math.ceil(count / limit),
			},
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			data: [],
			pagination: {
				page,
				limit,
				total: 0,
				totalPages: 0,
			},
		};
	}
}
