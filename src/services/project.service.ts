import { generateId } from "@/utils";
import { db, projects } from "@/db";
import type { Project } from "@/types/project.types";
import { and, desc, eq } from "drizzle-orm";
import { type APIResponse, APIStatus } from "@/types/api.types";

export class ProjectService {
	static async create(data: {
		name: string;
		description?: string | null;
		userId: string;
	}): Promise<APIResponse<Project>> {
		try {
			const [rawProject] = await db
				.insert(projects)
				.values({
					...data,
					id: generateId(),
					description: data.description?.trim() ?? "",
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawProject,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getAll(
		projectId: string,
		userId: string,
	): Promise<APIResponse<Project[]>> {
		try {
			const rawProjects = await db
				.select()
				.from(projects)
				.where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
				.orderBy(desc(projects.createdAt));

			return {
				status: APIStatus.Success,
				data: rawProjects,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(
		projectId: string,
		userId: string,
	): Promise<APIResponse<Project>> {
		try {
			const [rawProject] = await db
				.select()
				.from(projects)
				.where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
				.limit(1);

			if (!rawProject) {
				return {
					status: APIStatus.NotFound,
					error: "Project not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawProject,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async update(
		projectId: string,
		userId: string,
		data: { name: string; description?: string | null },
	): Promise<APIResponse<Project>> {
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

			const [rawUpdatedProject] = await db
				.update(projects)
				.set({
					...updatedData,
					updatedAt: new Date(),
				})
				.where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUpdatedProject,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async delete(
		projectId: string,
		userId: string,
	): Promise<APIResponse<Project>> {
		try {
			const [rawDeletedProject] = await db
				.delete(projects)
				.where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawDeletedProject,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
