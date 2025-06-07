import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

const commonSelect = {
	id: true,
	name: true,
	updated_at: true,
	created_at: true,
	assigned_to: {
		select: {
			name: true,
		},
	},
};

export async function getUserRecentActivity(userId: string, role: Role) {
	if (role === "OWNER" || role === "WORKFORCE_MANAGER") {
		return prisma.scheduleTask.findMany({
			where: {
				created_by_user_id: userId,
			},
			orderBy: {
				created_at: "desc",
			},
			take: 5,
			select: commonSelect,
		});
	}

	if (role === "LEADER" || role === "MEMBER") {
		return prisma.scheduleTask.findMany({
			where: {
				assigned_to_user_id: userId,
			},
			orderBy: {
				created_at: "desc",
			},
			take: 5,
			select: commonSelect,
		});
	}

	return [];
}
