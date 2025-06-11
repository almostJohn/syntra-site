import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

export async function getUserRecentActivity(userId: string, role: Role) {
	const taskPromise = await prisma.task.findMany({
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

	let scheduleTaskPromise;

	if (role === "OWNER" || role === "WORKFORCE_MANAGER") {
		scheduleTaskPromise = prisma.scheduleTask.findMany({
			where: {
				created_by_user_id: userId,
			},
			orderBy: {
				created_at: "desc",
			},
			take: 5,
			select: {
				id: true,
				name: true,
				created_at: true,
				assigned_to: {
					select: {
						name: true,
					},
				},
			},
		});
	} else if (role === "LEADER" || role === "MEMBER") {
		scheduleTaskPromise = prisma.scheduleTask.findMany({
			where: {
				assigned_to_user_id: userId,
			},
			orderBy: {
				created_at: "desc",
			},
			take: 5,
			select: {
				id: true,
				name: true,
				created_at: true,
				assigned_to: {
					select: {
						name: true,
					},
				},
			},
		});
	} else {
		scheduleTaskPromise = Promise.resolve([]);
	}

	const [tasks, scheduleTasks] = await Promise.all([
		taskPromise,
		scheduleTaskPromise,
	]);

	const taskActivities = tasks.map((task) => ({
		id: task.id,
		type: "TASK" as const,
		title: task.title ?? "Untitled",
		createdAt: task.created_at,
	}));

	const scheduleTaskActivities = scheduleTasks.map((scheduleTask) => ({
		id: scheduleTask.id,
		type: "SCHEDULE_TASK" as const,
		name: scheduleTask.name,
		createdAt: scheduleTask.created_at,
		assignedTo: scheduleTask.assigned_to.name,
	}));

	const merged = [...taskActivities, ...scheduleTaskActivities].sort(
		(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
	);

	return merged.slice(0, 5);
}
