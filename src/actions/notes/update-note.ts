"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { eq, and } from "drizzle-orm";
import { notes, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from "@/lib/constants";

export async function updateNote(
	noteId: string,
	title: string | null,
	description: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		if (title && title.length > TITLE_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
			};
		}

		if (description.length > DESCRIPTION_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Description exceeds the maximum allowed length of ${DESCRIPTION_MAX_LENGTH} characters.`,
				},
			};
		}

		const [updatedNote] = await db
			.update(notes)
			.set({ title, description })
			.where(and(eq(notes.id, noteId), eq(notes.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			noteId: updatedNote.id,
			type: "UPDATE_NOTE",
			description: `Note "${updatedNote.title}" updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			success: {
				statusCode: 200,
				message: "Note updated successfully.",
			},
			values: {
				title: updatedNote.title || "Untitled",
				description: updatedNote.description,
			},
		};
	});
}
