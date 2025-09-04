import { db, teamMembers } from "@/db";
import type { TeamMember } from "@/types/team-member.types";
import { type APIResponse, APIStatus } from "@/types/api.types";
import { and, eq } from "drizzle-orm";

export class TeamMemberService {
	static async create(data: {
		teamId: string;
		userId: string;
		role: "owner" | "admin" | "member";
	}): Promise<APIResponse<TeamMember>> {
		try {
			const [rawTeamMember] = await db
				.insert(teamMembers)
				.values({
					...data,
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawTeamMember,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async removeMember(
		teamId: string,
		memberId: string,
		requesterId: string,
	): Promise<APIResponse<TeamMember>> {
		try {
			const [requester] = await db
				.select()
				.from(teamMembers)
				.where(
					and(
						eq(teamMembers.teamId, teamId),
						eq(teamMembers.userId, requesterId),
					),
				)
				.limit(1);

			if (
				!requester ||
				(requester.role !== "owner" && requester.role !== "admin")
			) {
				return {
					status: APIStatus.Forbidden,
					error: "Only owner or admin can remove members",
				};
			}

			const [targetMember] = await db
				.select()
				.from(teamMembers)
				.where(
					and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, memberId)),
				)
				.limit(1);

			if (!targetMember) {
				return {
					status: APIStatus.NotFound,
					error: "Member not found",
				};
			}

			if (targetMember.role === "owner") {
				return {
					status: APIStatus.Forbidden,
					error: "Cannot remove the team owner",
				};
			}

			if (targetMember.role === "admin" && requester.role !== "owner") {
				return {
					status: APIStatus.Forbidden,
					error: "Only the owner can remove an admin",
				};
			}

			const [removedMember] = await db
				.delete(teamMembers)
				.where(
					and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, memberId)),
				)
				.returning();

			return {
				status: APIStatus.Success,
				data: removedMember,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async updateRole(
		teamId: string,
		memberId: string,
		requesterId: string,
		newRole: "admin" | "member",
	): Promise<APIResponse<TeamMember>> {
		try {
			const [requester] = await db
				.select()
				.from(teamMembers)
				.where(
					and(
						eq(teamMembers.teamId, teamId),
						eq(teamMembers.userId, requesterId),
					),
				)
				.limit(1);

			if (!requester || requester.role !== "owner") {
				return {
					status: APIStatus.Forbidden,
					error: "Only the team owner can update member roles",
				};
			}

			const [targetMember] = await db
				.select()
				.from(teamMembers)
				.where(
					and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, memberId)),
				)
				.limit(1);

			if (!targetMember) {
				return {
					status: APIStatus.NotFound,
					error: "Member not found",
				};
			}

			if (targetMember.role === "owner") {
				return {
					status: APIStatus.Forbidden,
					error: "Cannot change the owner's role",
				};
			}

			const [updatedMember] = await db
				.update(teamMembers)
				.set({
					role: newRole,
				})
				.where(
					and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, memberId)),
				)
				.returning();

			return {
				status: APIStatus.Success,
				data: updatedMember,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
