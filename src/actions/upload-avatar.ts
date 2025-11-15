"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ActionState, MessageType } from "@/types";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import {
	users as usersTable,
	notifications as notificationsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "@/lib/utils";

const AVATAR_MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
];

export async function uploadAvatar(
	_: ActionState,
	form: FormData,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to upload an avatar.",
			type: MessageType.Error,
		};
	}

	const file = form.get("avatar") as File | null;

	if (!file) {
		return {
			message: "No file uploaded.",
			type: MessageType.Error,
		};
	}

	if (!ALLOWED_MIME_TYPES.includes(file.type)) {
		return {
			message:
				"Invalid file type. Please upload a JPEG, PNG, GIF, or WEBP image.",
			type: MessageType.Error,
		};
	}

	if (file.size > AVATAR_MAX_SIZE) {
		return {
			message: "File size exceeds the maximum limit of 5MB.",
			type: MessageType.Error,
		};
	}

	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer).toString("base64");
		const avatarSize = file.size;

		await request.post({
			body: { avatar: buffer, avatarSize },
			fn: async ({ body }) => {
				await db
					.update(usersTable)
					.set({
						avatar: body!.avatar,
						avatarSize: body!.avatarSize,
						updatedAt: new Date(),
					})
					.where(eq(usersTable.id, currentUser.id));

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: "Your avatar has been uploaded successfully.",
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			message: "Avatar uploaded successfully.",
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
