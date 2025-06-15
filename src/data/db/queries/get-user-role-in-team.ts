import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

export async function getUserRoleInTeam(
	userId: string,
	teamId: string,
): Promise<Role | null> {
	const member = await prisma.member.findUnique({
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

	return member?.role ?? null;
}
