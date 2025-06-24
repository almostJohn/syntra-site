import { prisma } from "@/data/db/prisma";

export async function getUserUpdate(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			updated_at: true,
			created_at: true,
			display_name: true,
		},
	});

	if (!user) {
		return [];
	}

	const isCreated = user.created_at.getTime() === user.updated_at.getTime();

	return [
		{
			id: userId,
			type: isCreated
				? "USER_CREATE"
				: ("USER_UPDATE" as "USER_CREATE" | "USER_UPDATE"),
			createdAt: isCreated ? user.created_at : user.updated_at,
		},
	];
}
