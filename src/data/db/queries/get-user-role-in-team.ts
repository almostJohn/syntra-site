import { prisma } from "@/data/db/prisma";
import type { Role } from "@/generated/prisma";

export async function getUserRoleInTeam(
	userId: string,
	teamId: string,
): Promise<Role | null> {
	const teamMember = await prisma.team.findFirst({
		where: {
			id: teamId,
			members: {
				some: {
					id: userId,
				},
			},
		},
		select: {
			members: {
				where: {
					user_id: userId,
				},
				select: {
					role: true,
				},
			},
		},
	});

	return teamMember?.members[0]?.role ?? null;
}
