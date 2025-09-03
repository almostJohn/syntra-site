import { generateId } from "@/utils";
import { db, notifications } from "@/db";
import type { Notification } from "@/types/notification.types";
import { and, desc, eq } from "drizzle-orm";
import { type APIResponse, APIStatus } from "@/types/api.types";

export class NotificationService {
	static async create(data: {
		title: string;
		message: string;
		userId: string;
	}): Promise<APIResponse<Notification>> {
		try {
			const [rawNotification] = await db
				.insert(notifications)
				.values({
					...data,
					id: generateId(),
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawNotification,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getAll(userId: string): Promise<APIResponse<Notification[]>> {
		try {
			const rawNotifications = await db
				.select()
				.from(notifications)
				.where(eq(notifications.userId, userId))
				.orderBy(desc(notifications.createdAt));

			return {
				status: APIStatus.Success,
				data: rawNotifications,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(
		notificationId: string,
		userId: string,
	): Promise<APIResponse<Notification>> {
		try {
			const [rawNotification] = await db
				.select()
				.from(notifications)
				.where(
					and(
						eq(notifications.id, notificationId),
						eq(notifications.userId, userId),
					),
				)
				.limit(1);

			if (!rawNotification) {
				return {
					status: APIStatus.NotFound,
					error: "Notification not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawNotification,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async updateStatus(
		notificationId: string,
		userId: string,
		status: "archived" | "read" | "unread",
	): Promise<APIResponse<Notification>> {
		try {
			const [rawUpdatedNotification] = await db
				.update(notifications)
				.set({
					status,
					updatedAt: new Date(),
				})
				.where(
					and(
						eq(notifications.id, notificationId),
						eq(notifications.userId, userId),
					),
				)
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUpdatedNotification,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
