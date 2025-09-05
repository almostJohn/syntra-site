import { db, users, projects, comments, tasks, teams } from "@/db";
import { count } from "drizzle-orm";
import { type APIResponse, APIStatus } from "@/types/api.types";

type AnalyticsSize = {
	totalUsers: number;
	totalTeams: number;
	totalProjects: number;
	totalTasks: number;
	totalComments: number;
};

export class AnalyticsService {
	static async getSize(): Promise<APIResponse<AnalyticsSize>> {
		try {
			const [userCount, teamCount, projectCount, taskCount, commentCount] =
				await Promise.all([
					db.select({ value: count() }).from(users),
					db.select({ value: count() }).from(teams),
					db.select({ value: count() }).from(projects),
					db.select({ value: count() }).from(tasks),
					db.select({ value: count() }).from(comments),
				]);

			return {
				status: APIStatus.Success,
				data: {
					totalUsers: Number(userCount[0].value),
					totalTeams: Number(teamCount[0].value),
					totalProjects: Number(projectCount[0].value),
					totalTasks: Number(taskCount[0].value),
					totalComments: Number(commentCount[0].value),
				},
			};
		} catch (error) {
			return {
				status: APIStatus.Error,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
