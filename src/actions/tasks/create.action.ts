"use server";

import { prisma } from "@/data/db/prisma";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getFormValue } from "@/lib/getFormValue";
import {
	TITLE_MAX_LENGTH,
	SUBTITLE_MAX_LENGTH,
	CONTENT_MAX_LENGTH,
} from "@/lib/constants";

export async function create(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const title = getFormValue(formData, "title");
		const subtitle = getFormValue(formData, "subtitle");
		const content = getFormValue(formData, "content");

		if (!content) {
			return {
				errorMessage: "Content is a required field.",
				errors: {
					content: "Content is a required field.",
				},
				values: {
					title: title ?? "",
					subtitle: subtitle ?? "",
				},
			};
		}

		if (title && title.length > TITLE_MAX_LENGTH) {
			return {
				errorMessage: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				errors: {
					title: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				values: {
					subtitle: subtitle ?? "",
					content,
				},
			};
		}

		if (subtitle && subtitle.length > SUBTITLE_MAX_LENGTH) {
			return {
				errorMessage: `Subtitle exceeds the maximum allowed length of ${SUBTITLE_MAX_LENGTH} characters.`,
				errors: {
					subtitle: `Subtitle exceeds the maximum allowed length of ${SUBTITLE_MAX_LENGTH} characters.`,
				},
				values: {
					title: title ?? "",
					content,
				},
			};
		}

		if (content.length > CONTENT_MAX_LENGTH) {
			return {
				errorMessage: `Content exceeds the maximum allowed length of ${CONTENT_MAX_LENGTH} characters.`,
				errors: {
					content: `Content exceeds the maximum allowed length of ${CONTENT_MAX_LENGTH} characters.`,
				},
				values: {
					title: title ?? "",
					subtitle: subtitle ?? "",
				},
			};
		}

		const newTask = await prisma.task.create({
			data: {
				title: title ?? "",
				subtitle: subtitle ?? "",
				content,
				is_completed: false,
				user_id: currentUser.id,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				task_id: newTask.id,
				message: `New task "${newTask.title || "Untitled"}" created.`,
				type: "CREATE_TASK",
				is_read: false,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Successfully created task.",
		};
	});
}
