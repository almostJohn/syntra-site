import { prisma } from "@/data/db/prisma";

export async function getUserTeams(userId: string) {
	return await prisma.team.findMany({
		where: {
			members: {
				some: {
					user_id: userId,
				},
			},
		},
		select: {
			id: true,
			name: true,
			owner_id: true,
		},
	});
}
