import { gte, lte, eq, and, or } from "drizzle-orm";
import { format } from "date-fns";
import { db } from "../db/client";
import { tasks } from "../db/schema";

export async function getTaskActivities(userId: string) {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(endDate.getDate() - 364);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 999);

	const tasksPromise = await db
		.select({
			createdAt: tasks.createdAt,
			updatedAt: tasks.updatedAt,
		})
		.from(tasks)
		.where(
			and(
				eq(tasks.userId, userId),
				or(
					and(gte(tasks.createdAt, startDate), lte(tasks.createdAt, endDate)),
					and(gte(tasks.updatedAt, startDate), lte(tasks.updatedAt, endDate)),
				),
			),
		);

	const activities = new Map<string, number>();

	for (const task of tasksPromise) {
		const createdDate = format(task.createdAt, "yyyy-MM-dd");
		activities.set(createdDate, (activities.get(createdDate) ?? 0) + 1);

		const updatedDate = format(task.updatedAt, "yyyy-MM-dd");
		activities.set(updatedDate, (activities.get(updatedDate) ?? 0) + 1);
	}

	const heatmapData: { date: string; count: number }[] = [];
	for (let i = 0; i < 365; i++) {
		const date = new Date(startDate);
		date.setDate(date.getDate() + i);
		const dateString = format(date, "yyyy-MM-dd");
		const activitiesCount = activities.get(dateString) ?? 0;
		heatmapData.push({ date: dateString, count: activitiesCount });
	}

	const weeks: { date: string; count: number }[][] = [];
	for (let i = 0; i < heatmapData.length; i += 7) {
		weeks.push(heatmapData.slice(i, i + 7));
	}

	return weeks;
}
