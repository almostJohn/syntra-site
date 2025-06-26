import { gte, lte, eq, and } from "drizzle-orm";
import { format } from "date-fns";
import { db } from "../db/client";
import { tasks, notes } from "../db/schema";

export async function getUserActivities(userId: string) {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(endDate.getDate() - 364);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 9999);

	const [tasksPromise, notesPromise] = await Promise.all([
		db
			.select({ createdAt: tasks.createdAt })
			.from(tasks)
			.where(
				and(
					eq(tasks.userId, userId),
					gte(tasks.createdAt, startDate),
					lte(tasks.createdAt, endDate),
				),
			),
		db
			.select({ createdAt: notes.createdAt })
			.from(notes)
			.where(
				and(
					eq(notes.userId, userId),
					gte(notes.createdAt, startDate),
					lte(notes.createdAt, endDate),
				),
			),
	]);

	const activities = new Map<string, number>();

	for (const task of tasksPromise) {
		const date = format(task.createdAt, "yyyy-MM-dd");
		activities.set(date, (activities.get(date) ?? 0) + 1);
	}

	for (const note of notesPromise) {
		const date = format(note.createdAt, "yyyy-MM-dd");
		activities.set(date, (activities.get(date) ?? 0) + 1);
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
