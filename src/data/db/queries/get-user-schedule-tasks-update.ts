import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

type ScheduleTaskPayload = {
	id: string;
	name: string;
	created_at: Date;
	assigned_to: {
		name: string;
	};
};

export async function getUserScheduleTasksUpdate(
	userId: string,
	role: Role,
	teamId: string,
) {
	let scheduleTasks: ScheduleTaskPayload[] = [];

	if (role === "OWNER" || role === "WORKFORCE_MANAGER") {
		scheduleTasks = await prisma.scheduleTask.findMany({
			where: {
				created_by_user_id: userId,
				team_id: teamId,
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
		scheduleTasks = await prisma.scheduleTask.findMany({
			where: {
				assigned_to_user_id: userId,
				team_id: teamId,
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
		scheduleTasks = [];
	}

	return scheduleTasks.map((task) => ({
		id: task.id,
		type: "SCHEDULE_TASK_UPDATE" as const,
		name: task.name,
		createdAt: task.created_at,
		assignedTo: task.assigned_to.name,
	}));
}
