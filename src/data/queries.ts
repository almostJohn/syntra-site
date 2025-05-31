import { prisma } from "./db/prisma";
import { Prisma } from "@/generated/prisma";

export async function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
	});
}

export async function findUserById(userId: string) {
	return prisma.user.findUnique({
		where: { id: userId },
	});
}

export async function findVerifiedUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email_verified: true,
		},
	});
}

export async function getUserNotes(userId: string) {
	return prisma.note.findMany({
		where: { owner_id: userId },
		include: { tags: true },
		orderBy: { created_at: "desc" },
	});
}

export async function getUserBoards(userId: string) {
	return prisma.board.findMany({
		where: { owner_id: userId },
		orderBy: { created_at: "desc" },
	});
}

export async function getUserTeamMemberships(userId: string) {
	return prisma.teamMember.findMany({
		where: { user_id: userId },
		include: { team: true },
	});
}

export async function findTeamById(teamId: string) {
	return prisma.team.findUnique({
		where: { id: teamId },
		include: {
			owner: true,
			members: {
				include: {
					user: true,
				},
			},
			boards: true,
		},
	});
}

export async function getTeamsOwnedByUser(userId: string) {
	return prisma.team.findMany({
		where: { owner_id: userId },
	});
}

export async function getTeamMembers(teamId: string) {
	return prisma.teamMember.findMany({
		where: { team_id: teamId },
		include: {
			user: true,
		},
	});
}

export async function findNoteById(noteId: string) {
	return prisma.note.findUnique({
		where: { id: noteId },
		include: {
			owner: true,
			tags: true,
		},
	});
}

export async function getNotesByTag(tagId: string) {
	return prisma.note.findMany({
		where: {
			tags: {
				some: {
					id: tagId,
				},
			},
		},
		include: {
			owner: true,
			tags: true,
		},
		orderBy: { created_at: "desc" },
	});
}

export async function findBoardById(boardId: string) {
	return prisma.board.findMany({
		where: { id: boardId },
		include: {
			owner: true,
			team: true,
			statuses: {
				orderBy: {
					order: "asc",
				},
				include: {
					tasks: {
						orderBy: {
							created_at: "asc",
						},
					},
				},
			},
		},
	});
}

export async function getTeamBoards(teamId: string) {
	return prisma.board.findMany({
		where: { team_id: teamId },
		orderBy: { created_at: "desc" },
	});
}

export async function getStatusById(statusId: string) {
	return prisma.status.findUnique({
		where: { id: statusId },
		include: {
			board: true,
			tasks: true,
		},
	});
}

export async function getBoardStatuses(boardId: string) {
	return prisma.status.findMany({
		where: { board_id: boardId },
		orderBy: { created_at: "asc" },
		include: {
			tasks: {
				orderBy: {
					created_at: "asc",
				},
			},
		},
	});
}

export async function findTaskById(taskId: string) {
	return prisma.task.findUnique({
		where: { id: taskId },
		include: {
			status: {
				include: {
					board: true,
				},
			},
		},
	});
}

export async function getStatusTasks(statusId: string) {
	return prisma.task.findMany({
		where: { status_id: statusId },
		orderBy: { created_at: "asc" },
	});
}

export async function getUserActivities(userId: string, take?: number) {
	return prisma.activity.findMany({
		where: { user_id: userId },
		orderBy: { created_at: "desc" },
		take,
		include: { user: true },
	});
}

export async function getUserNotifications(userId: string, read?: boolean) {
	const whereClause: Prisma.NotificationWhereInput = {
		user_id: userId,
	};

	if (read !== undefined) {
		whereClause.read = read;
	}

	return prisma.notification.findMany({
		where: whereClause,
		orderBy: { created_at: "desc" },
	});
}

export async function getUnreadNotificationsCount(userId: string) {
	return prisma.notification.count({
		where: {
			user_id: userId,
			read: false,
		},
	});
}

export async function getAllTags() {
	return prisma.tag.findMany();
}

export async function findTagByName(tagName: string) {
	return prisma.tag.findUnique({
		where: { name: tagName },
	});
}

export async function findUserSessionByToken(token: string) {
	return prisma.userSession.findUnique({
		where: { token },
		include: { user: true },
	});
}
