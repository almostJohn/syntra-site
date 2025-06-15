import { prisma } from "@/data/db/prisma";

export async function getUserUpdate(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			updated_at: true,
			name: true,
			email: true,
		},
	});

	if (!user) {
		return [];
	}

	return [
		{
			id: userId,
			type: "PROFILE_UPDATE" as const,
			email: user.email,
			name: user.name,
			createdAt: user.updated_at,
		},
	];
}
