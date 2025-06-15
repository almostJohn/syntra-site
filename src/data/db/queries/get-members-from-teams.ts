import { prisma } from "@/data/db/prisma";

export async function getMembersFromTeams(teamId: string) {
	return await prisma.member.findMany({
		where: {
			team_id: teamId,
		},
		include: {
			user: {
				select: {
					id: true,
					email: true,
					name: true,
				},
			},
		},
	});
}
