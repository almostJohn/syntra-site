import { prisma } from "@/data/db/prisma";

export async function getAllNotes(userId: string) {
	return await prisma.note.findMany({
		where: {
			user_id: userId,
		},
		orderBy: {
			created_at: "desc",
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
