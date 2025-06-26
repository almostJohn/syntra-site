import { eq, and } from "drizzle-orm";
import { db } from "../db/client";
import { notes } from "../db/schema";

export async function getUserNote(userId: string, noteId: string) {
	return await db
		.select({
			id: notes.id,
			title: notes.title,
			description: notes.description,
			createdAt: notes.createdAt,
			userId: notes.userId,
		})
		.from(notes)
		.where(and(eq(notes.id, noteId), eq(notes.userId, userId)));
}
