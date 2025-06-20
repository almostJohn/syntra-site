"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { TITLE_MAX_LENGTH, CONTENT_MAX_LENGTH } from "@/lib/constants";

export async function updateNote(
	noteId: string,
	title: string | null,
	content: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (title && title.length > TITLE_MAX_LENGTH) {
			return {
				errorMessage: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
			};
		}

		if (content.length > CONTENT_MAX_LENGTH) {
			return {
				errorMessage: `Content exceeds the maximum allowed length of ${CONTENT_MAX_LENGTH} characters.`,
			};
		}

		const updatedNote = await prisma.note.update({
			where: {
				id: noteId,
				user_id: currentUser.id,
			},
			data: {
				title,
				content,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			successMessage: "Note updated successfully.",
			values: {
				title: updatedNote.title || "Untitled",
				content: updatedNote.content,
			},
		};
	});
}
