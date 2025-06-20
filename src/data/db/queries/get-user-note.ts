import { prisma } from "@/data/db/prisma";

export async function getUserNote(userId: string, noteId: string) {
	return await prisma.note.findUnique({
		where: {
			id: noteId,
			user_id: userId,
		},
		select: {
			id: true,
			title: true,
			content: true,
			created_at: true,
			user_id: true,
		},
	});
}
