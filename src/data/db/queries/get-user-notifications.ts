import { prisma } from "@/data/db/prisma";

export async function getUserNotifications(userId: string) {
	return await prisma.notification.findMany({
		where: {
			user_id: userId,
		},
		orderBy: {
			created_at: "desc",
		},
		include: {
			task: true,
			schedule_task: true,
			team: true,
		},
	});
}
