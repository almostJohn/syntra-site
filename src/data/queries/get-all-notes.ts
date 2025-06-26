import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { notes } from "../db/schema";

export async function getAllNotes(userId: string) {
	return await db
		.select({
			id: notes.id,
			title: notes.title,
			description: notes.description,
			createdAt: notes.createdAt,
			userId: notes.userId,
		})
		.from(notes)
		.where(eq(notes.userId, userId))
		.orderBy(desc(notes.createdAt));
}
