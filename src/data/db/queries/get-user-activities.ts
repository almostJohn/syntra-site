import { prisma } from "@/data/db/prisma";
import { format } from "date-fns";

export async function getUserActivities(userId: string) {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(endDate.getDate() - 364);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 9999);

	const [tasks, notes] = await Promise.all([
		prisma.task.findMany({
			where: {
				user_id: userId,
				created_at: {
					gte: startDate,
					lte: endDate,
				},
			},
			select: {
				created_at: true,
			},
		}),
		prisma.note.findMany({
			where: {
				user_id: userId,
				created_at: {
					gte: startDate,
					lte: endDate,
				},
			},
			select: {
				created_at: true,
			},
		}),
	]);

	const activityMap = new Map<string, number>();

	for (const task of tasks) {
		const date = format(task.created_at, "yyyy-MM-dd");
		activityMap.set(date, (activityMap.get(date) ?? 0) + 1);
	}

	for (const note of notes) {
		const date = format(note.created_at, "yyyy-MM-dd");
		activityMap.set(date, (activityMap.get(date) ?? 0) + 1);
	}

	const heatmapData: { date: string; count: number }[] = [];

	for (let i = 0; i < 365; i++) {
		const date = new Date(startDate);
		date.setDate(date.getDate() + i);
		const dateString = format(date, "yyyy-MM-dd");
		const activityCount = activityMap.get(dateString) ?? 0;
		heatmapData.push({ date: dateString, count: activityCount });
	}

	const weeks: { date: string; count: number }[][] = [];

	for (let i = 0; i < heatmapData.length; i += 7) {
		weeks.push(heatmapData.slice(i, i + 7));
	}

	return weeks;
}
