import { prisma } from "@/data/db/prisma";
import { format } from "date-fns";

export async function getUserTaskHeatmapWeeks(userId: string) {
	const startDate = new Date();
	const endDate = new Date();
	startDate.setDate(endDate.getDate() - 364);

	const tasks = await prisma.task.findMany({
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
	});

	const taskMap = new Map<string, number>();
	for (const task of tasks) {
		const date = format(task.created_at, "yyyy-MM-dd");
		taskMap.set(date, (taskMap.get(date) ?? 0) + 1);
	}

	const heatmapData: { date: string; count: number }[] = [];
	for (let i = 0; i < 365; i++) {
		const date = new Date(startDate);
		date.setDate(date.getDate() + i);
		const dateString = format(date, "yyyy-MM-dd");
		heatmapData.push({
			date: dateString,
			count: taskMap.get(dateString) ?? 0,
		});
	}

	const weeks: { date: string; count: number }[][] = [];

	for (let i = 0; i < heatmapData.length; i += 7) {
		weeks.push(heatmapData.slice(i, i + 7));
	}

	return weeks;
}
