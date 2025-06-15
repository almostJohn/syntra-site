import { prisma } from "@/data/db/prisma";

export async function getUserTeamUpdate(userId: string) {
	const teams = await prisma.team.findMany({
		where: {
			owner_id: userId,
		},
		orderBy: {
			created_at: "desc",
		},
		select: {
			updated_at: true,
			id: true,
			name: true,
		},
	});

	return teams.map((team) => ({
		id: team.id,
		type: "TEAM_UPDATE" as const,
		name: team.name,
		createdAt: team.updated_at,
	}));
}
