import { generateId } from "@/utils";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import type { User } from "@/types/user.types";
import { type APIResponse, APIStatus } from "@/types/api.types";

export class UserService {
	static async create(data: {
		username: string;
		userTag: string;
		displayName: string;
		password: string;
	}): Promise<APIResponse<User>> {
		try {
			const [rawUser] = await db
				.insert(users)
				.values({
					...data,
					id: generateId(),
				})
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUser,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getById(userId: string): Promise<APIResponse<User>> {
		try {
			const [rawUser] = await db
				.select()
				.from(users)
				.where(eq(users.id, userId))
				.limit(1);

			if (!rawUser) {
				return {
					status: APIStatus.NotFound,
					error: "User not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawUser,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async getByUsername(username: string): Promise<APIResponse<User>> {
		try {
			const [rawUser] = await db
				.select()
				.from(users)
				.where(eq(users.username, username))
				.limit(1);

			if (!rawUser) {
				return {
					status: APIStatus.NotFound,
					error: "User not found",
				};
			}

			return {
				status: APIStatus.Success,
				data: rawUser,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async update(
		userId: string,
		data: {
			username?: string;
			displayName?: string;
			password?: string;
		},
	): Promise<APIResponse<User>> {
		try {
			const updatedData = Object.fromEntries(
				// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
				Object.entries(data).filter(([_, v]) => v !== undefined),
			);

			if (Object.keys(updatedData).length === 0) {
				return {
					status: APIStatus.ValidationError,
					error: "No fields provided for update",
				};
			}

			const [rawUpdatedUser] = await db
				.update(users)
				.set({
					...updatedData,
					updatedAt: new Date(),
				})
				.where(eq(users.id, userId))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawUpdatedUser,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	static async delete(userId: string): Promise<APIResponse<User>> {
		try {
			const [rawDeletedUser] = await db
				.delete(users)
				.where(eq(users.id, userId))
				.returning();

			return {
				status: APIStatus.Success,
				data: rawDeletedUser,
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
