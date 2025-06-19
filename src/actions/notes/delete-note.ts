"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";

export async function deleteNote(noteId: string): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const deletedNote = await prisma.note.delete({
			where: {
				id: noteId,
				user_id: currentUser.id,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				message: `Note "${deletedNote.title || "Untitled"}" deleted.`,
				type: "DELETE_NOTE",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			successMessage: "Note deleted successfully.",
		};
	});
}
