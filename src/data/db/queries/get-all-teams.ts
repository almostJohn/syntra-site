import { prisma } from "@/data/db/prisma";

export async function getAllTeams(userId: string) {
	return await prisma.team.findMany({
		where: {
			owner_id: userId,
		},
		orderBy: {
			created_at: "desc",
		},
	});
}
