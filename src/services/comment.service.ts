import { generateId } from "@/utils";
import { db, comments, tasks, projects } from "@/db";
import { type APIResponse, APIStatus } from "@/types/api.types";
import type { Comment } from "@/types/comment.types";
import { and, desc, eq } from "drizzle-orm";

export class CommentService {
	static async create(data: {
		description: string;
		taskId: string;
		userId: string;
	}): Promise<APIResponse<Comment>> {
		try {
			const [rawComment] = await db
				.insert(comments)
				.values({
					...data,
					id: generateId(),
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawComment,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getAll(teamId: string): Promise<APIResponse<Comment[]>> {
		try {
			const rawComments = await db
				.select()
				.from(comments)
				.innerJoin(tasks, eq(comments.taskId, tasks.id))
				.innerJoin(projects, eq(tasks.projectId, projects.id))
				.where(eq(projects.teamId, teamId))
				.orderBy(desc(comments.createdAt));

			return {
				status: APIStatus.Success,
				data: rawComments.map((row) => row.comments),
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(
		commentId: string,
		teamId: string,
	): Promise<APIResponse<Comment>> {
		try {
			const [rawComment] = await db
				.select()
				.from(comments)
				.innerJoin(tasks, eq(comments.taskId, tasks.id))
				.innerJoin(projects, eq(tasks.projectId, projects.id))
				.where(and(eq(comments.id, commentId), eq(projects.teamId, teamId)))
				.limit(1);

			if (!rawComment.comments) {
				return {
					status: APIStatus.NotFound,
					error: "Comment not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawComment.comments,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async update(
		commentId: string,
		userId: string,
		data: { description: string },
	): Promise<APIResponse<Comment>> {
		try {
			const [rawComment] = await db
				.update(comments)
				.set({
					...data,
					updatedAt: new Date(),
				})
				.where(and(eq(comments.id, commentId), eq(comments.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawComment,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async delete(
		commentId: string,
		userId: string,
	): Promise<APIResponse<Comment>> {
		try {
			const [rawDeletedComment] = await db
				.delete(comments)
				.where(and(eq(comments.id, commentId), eq(comments.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawDeletedComment,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
