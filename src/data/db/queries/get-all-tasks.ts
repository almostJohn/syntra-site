import { prisma } from "@/data/db/prisma";

export async function getAllTasks(userId: string) {
	return await prisma.task.findMany({
		where: {
			user_id: userId,
		},
		orderBy: {
			created_at: "desc",
		},
	});
}
