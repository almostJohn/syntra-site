import "server-only";
import { db } from "@/db/sql";
import { eq, desc, sql } from "drizzle-orm";
import {
	notifications as notificationsTable,
	users as usersTable,
} from "@/db/schema";

export type Author = {
	id: string;
	username: string;
	avatar: string | null;
};

export type NotificationStatus = "archived" | "read" | "unread";
export type Notification = {
	id: string;
	content: string;
	status: NotificationStatus;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type NotificationWithAuthor = Notification & {
	author: Author;
};

export async function getNotifications(
	userId: string,
): Promise<Notification[]> {
	try {
		const raw_notifications = await db
			.select()
			.from(notificationsTable)
			.where(eq(notificationsTable.userId, userId))
			.orderBy(desc(notificationsTable.createdAt));

		return raw_notifications;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return [];
	}
}

export async function getNotificationsPaginated({
	userId,
	page = 1,
	limit = 10,
}: {
	userId: string;
	page: number;
	limit: number;
}) {
	try {
		const offset = (page - 1) * limit;

		const raw_data = await db
			.select({
				id: notificationsTable.id,
				content: notificationsTable.content,
				status: notificationsTable.status,
				userId: notificationsTable.userId,
				createdAt: notificationsTable.createdAt,
				updatedAt: notificationsTable.updatedAt,
				author: {
					id: usersTable.id,
					username: usersTable.username,
					avatar: usersTable.avatar,
				},
			})
			.from(notificationsTable)
			.innerJoin(usersTable, eq(usersTable.id, notificationsTable.userId))
			.where(eq(notificationsTable.userId, userId))
			.orderBy(desc(notificationsTable.createdAt))
			.limit(limit)
			.offset(offset);

		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(notificationsTable);

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
