"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { createNotificationMessage, getFormFile } from "@/lib/utils";
import { auth } from "@/lib/auth";
import {
	AVATAR_MAX_UPLOAD_SIZE,
	AVATAR_AVAILABLE_IMAGE_TYPES,
} from "@/lib/constants";
import { db } from "@/db/sql";
import { notifications, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateUUID } from "@/lib/crypto";

type UploadErrors = {
	file: string;
};

type UploadValues = {
	file: File | null;
};

export async function uploadAvatar(
	_prevState: ActionResponse<UploadErrors, UploadValues>,
	formData: FormData,
): Promise<ActionResponse<UploadErrors, UploadValues>> {
	return serverActionCallback(
		async (): Promise<ActionResponse<UploadErrors, UploadValues>> => {
			const user = await auth.getCurrentUser();

			if (!user) {
				return {
					errorMessage: "You must be logged in to perform this action.",
				};
			}

			const file = getFormFile(formData, "avatar");

			if (!file) {
				return {
					errorMessage: "No avatar file uploaded.",
				};
			}

			if (!AVATAR_AVAILABLE_IMAGE_TYPES.includes(file.type)) {
				return {
					errorMessage: "Only PNG and JPEG is allowed.",
					errors: {
						file: "Only PNG and JPEG is allowed.",
					},
					values: {
						file,
					},
				};
			}

			if (file.size > AVATAR_MAX_UPLOAD_SIZE) {
				return {
					errorMessage: "Avatar must be 2MB or smaller.",
					errors: {
						file: "Avatar must be 2MB or smaller.",
					},
					values: {
						file,
					},
				};
			}

			const arrayBuffer = await file.arrayBuffer();
			const base64 = Buffer.from(arrayBuffer).toString("base64");
			const avatarSize = file.size;

			const updatedUser = await db
				.update(users)
				.set({
					avatar: base64,
					avatarSize,
					updatedAt: new Date(),
				})
				.where(eq(users.id, user.id))
				.returning();

			if (updatedUser) {
				await db.insert(notifications).values({
					id: generateUUID(),
					userId: user.id,
					content: createNotificationMessage("updated", "avatar"),
				});
			}

			revalidatePath("/app");
			revalidatePath("/app/settings");

			return {
				successMessage: "Avatar uploaded successfully.",
			};
		},
	);
}
