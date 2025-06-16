"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { getFormValue } from "@/lib/get-form-value";
import { TITLE_MAX_LENGTH, CONTENT_MAX_LENGTH } from "@/lib/constants";

export async function createNote(
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

		const title = getFormValue(formData, "title") || "Untitled";
		const content = getFormValue(formData, "content");

		if (!content) {
			return {
				errorMessage: "Content is a required field.",
				errors: {
					content: "Content is a required field.",
				},
				values: {
					title,
				},
			};
		}

		if (title.length > TITLE_MAX_LENGTH) {
			return {
				errorMessage: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				errors: {
					title: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				values: {
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
					title,
				},
			};
		}

		const newNote = await prisma.note.create({
			data: {
				title,
				content,
				user_id: currentUser.id,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				note_id: newNote.id,
				message: `New note "${newNote.title || "Untitled"}" created.`,
				type: "CREATE_NOTE",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			successMessage: "Note created successfully.",
		};
	});
}
