import { prisma } from "@/data/db/prisma";
import { Status } from "@/generated/prisma";

export async function getTasksByStatus(userId: string, status: Status) {
	return await prisma.task.findMany({
		where: {
			user_id: userId,
			status,
		},
		orderBy: {
			created_at: "desc",
		},
		select: {
			id: true,
			title: true,
			content: true,
			status: true,
			user_id: true,
		},
	});
}
