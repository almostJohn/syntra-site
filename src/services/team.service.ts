import { generateId } from "@/utils";
import { db, teams, users } from "@/db";
import type { Team, TeamOwner } from "@/types/team.types";
import { type APIResponse, APIStatus } from "@/types/api.types";
import { and, desc, eq } from "drizzle-orm";

export class TeamService {
	static async create(data: {
		name: string;
		description?: string | null;
		userId: string;
	}): Promise<APIResponse<Team>> {
		try {
			const [rawTeam] = await db
				.insert(teams)
				.values({
					...data,
					id: generateId(),
					description: data.description?.trim() ?? "",
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawTeam,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getAll(
		teamId: string,
		userId: string,
	): Promise<APIResponse<Team[]>> {
		try {
			const rawTeams = await db
				.select()
				.from(teams)
				.where(and(eq(teams.id, teamId), eq(teams.userId, userId)))
				.orderBy(desc(teams.createdAt));

			return {
				status: APIStatus.Success,
				data: rawTeams,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(
		teamId: string,
		userId: string,
	): Promise<APIResponse<Team>> {
		try {
			const [rawTeam] = await db
				.select()
				.from(teams)
				.where(and(eq(teams.id, teamId), eq(teams.userId, userId)))
				.limit(1);

			if (!rawTeam) {
				return {
					status: APIStatus.NotFound,
					error: "Team not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawTeam,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async fetchTeamOwner(teamId: string): Promise<APIResponse<TeamOwner>> {
		try {
			const [rawOwner] = await db
				.select({
					id: users.id,
					username: users.username,
					userTag: users.userTag,
					displayName: users.displayName,
				})
				.from(teams)
				.innerJoin(users, eq(teams.userId, users.id))
				.where(eq(teams.id, teamId))
				.limit(1);

			if (!rawOwner) {
				return {
					status: APIStatus.NotFound,
					error: "Team owner not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawOwner,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async update(
		teamId: string,
		userId: string,
		data: {
			name: string;
			description?: string | null;
		},
	): Promise<APIResponse<Team>> {
		try {
			const normalRawData = {
				...data,
				description:
					data.description !== undefined
						? data.description?.trim() || ""
						: undefined,
			};

			const updatedData = Object.fromEntries(
				// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
				Object.entries(normalRawData).filter(([_, v]) => v !== undefined),
			);

			if (Object.keys(updatedData).length === 0) {
				return {
					status: APIStatus.ValidationError,
					error: "No fields provided for update",
				};
			}

			const [rawUpdatedTeam] = await db
				.update(teams)
				.set({
					...data,
					updatedAt: new Date(),
				})
				.where(and(eq(teams.id, teamId), eq(teams.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUpdatedTeam,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async delete(
		teamId: string,
		userId: string,
	): Promise<APIResponse<Team>> {
		try {
			const [rawDeletedTeam] = await db
				.delete(teams)
				.where(and(eq(teams.id, teamId), eq(teams.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawDeletedTeam,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
