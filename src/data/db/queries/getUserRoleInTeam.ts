import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

export async function getUserRoleInTeam(
	userId: string,
	teamId: string,
): Promise<Role | null> {
	const team = await prisma.team.findUnique({
		where: { id: teamId },
		select: { owner_id: true },
	});

	if (!team) {
		return null;
	}

	if (team.owner_id === userId) {
		return "OWNER";
	}

	const teamMember = await prisma.member.findUnique({
		where: {
			user_id_team_id: {
				user_id: userId,
				team_id: teamId,
			},
		},
		select: {
			role: true,
		},
	});

	return teamMember?.role ?? null;
}
