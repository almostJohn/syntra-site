import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { notes } from "../db/schema";

export async function getUserNotesUpdate(userId: string) {
	const rawNotes = await db
		.select({
			id: notes.id,
			title: notes.title,
			createdAt: notes.createdAt,
			updatedAt: notes.updatedAt,
		})
		.from(notes)
		.where(eq(notes.userId, userId))
		.orderBy(desc(notes.createdAt))
		.limit(5);

	return rawNotes.map((note) => {
		const isNew = note.createdAt.getTime() === note.updatedAt.getTime();
		return {
			id: note.id,
			title: note.title ?? "Untitled",
			type: isNew
				? "NOTE_CREATE"
				: ("NOTE_UPDATE" as "NOTE_CREATE" | "NOTE_UPDATE"),
			createdAt: isNew ? note.createdAt : note.updatedAt,
		};
	});
}
