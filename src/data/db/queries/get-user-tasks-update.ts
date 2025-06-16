import { prisma } from "@/data/db/prisma";

export async function getUserTasksUpdate(userId: string) {
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
			updated_at: true,
		},
	});

	return tasks.map((task) => ({
		id: task.id,
		type:
			task.created_at.getTime() === task.updated_at.getTime()
				? "TASK_CREATE"
				: ("TASK_UPDATE" as "TASK_CREATE" | "TASK_UPDATE"),
		title: task.title ?? "Untitled",
		createdAt:
			task.created_at.getTime() === task.updated_at.getTime()
				? task.created_at
				: task.updated_at,
	}));
}
