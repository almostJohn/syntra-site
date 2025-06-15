import { prisma } from "@/data/db/prisma";

export async function getUserTasks(userId: string) {
	const tasks = await prisma.task.findMany({
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
		},
	});

	return tasks.map((task) => ({
		id: task.id,
		type: "TASK_UPDATE" as const,
		title: task.title ?? "Untitled",
		createdAt: task.created_at,
	}));
}
