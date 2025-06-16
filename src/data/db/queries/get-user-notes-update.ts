import { prisma } from "@/data/db/prisma";

export async function getUserNotesUpdate(userId: string) {
	const notes = await prisma.note.findMany({
		where: {
			user_id: userId,
		},
		orderBy: {
			created_at: "desc",
		},
		take: 5,
		select: {
			id: true,
			title: true,
			created_at: true,
			updated_at: true,
		},
	});

	return notes.map((note) => ({
		id: note.id,
		type:
			note.created_at.getTime() === note.updated_at.getTime()
				? "NOTE_CREATE"
				: ("NOTE_UPDATE" as "NOTE_CREATE" | "NOTE_UPDATE"),
		title: note.title ?? "Untitled",
		createdAt:
			note.created_at.getTime() === note.updated_at.getTime()
				? note.created_at
				: note.updated_at,
	}));
}
