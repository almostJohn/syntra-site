"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { notes, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function deleteNote(noteId: string): Promise<ActionResponse> {
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

		const [deletedNote] = await db
			.delete(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			type: "DELETE_NOTE",
			description: `Note "${deletedNote.title || "Untitled"}" deleted.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			success: {
				statusCode: 200,
				message: "Note deleted successfully.",
			},
		};
	});
}
