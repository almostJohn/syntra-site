import { db } from "@/db/sql";
import {
	projects as projectsTable,
	users as usersTable,
	tasks as tasksTable,
	notifications as notificationsTable,
} from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import type { User, Project, Task, Notification } from "./data.types";

export class DataQuery {
	static async getUserByUsername(username: string): Promise<User | null> {
		try {
			const [user] = await db
				.select()
				.from(usersTable)
				.where(eq(usersTable.username, username))
				.limit(1);

			if (!user) {
				return null;
			}

			return user;
		} catch {
			return null;
		}
	}

	static async getUserById(userId: string): Promise<User | null> {
		try {
			const [user] = await db
				.select()
				.from(usersTable)
				.where(eq(usersTable.id, userId))
				.limit(1);

			if (!user) {
				return null;
			}

			return user;
		} catch {
			return null;
		}
	}

	static async getAllProjects(userId: string): Promise<Project[]> {
		try {
			const projects = await db
				.select()
				.from(projectsTable)
				.where(eq(projectsTable.userId, userId))
				.orderBy(desc(projectsTable.createdAt));

			return projects;
		} catch {
			return [];
		}
	}

	static async getProjectById(
		projectId: string,
		userId: string,
	): Promise<Project | null> {
		try {
			const [project] = await db
				.select()
				.from(projectsTable)
				.where(
					and(
						eq(projectsTable.id, projectId),
						eq(projectsTable.userId, userId),
					),
				)
				.limit(1);

			if (!project) {
				return null;
			}

			return project;
		} catch {
			return null;
		}
	}

	static async getAllTasks(projectId: string, userId: string): Promise<Task[]> {
		try {
			const tasks = await db
				.select()
				.from(tasksTable)
				.where(
					and(
						eq(tasksTable.projectId, projectId),
						eq(tasksTable.userId, userId),
					),
				)
				.orderBy(desc(tasksTable.createdAt));

			return tasks;
		} catch {
			return [];
		}
	}

	static async getAllNotifications(userId: string): Promise<Notification[]> {
		try {
			const notifications = await db
				.select()
				.from(notificationsTable)
				.where(eq(notificationsTable.userId, userId))
				.orderBy(desc(notificationsTable.createdAt));

			return notifications;
		} catch {
			return [];
		}
	}
}
