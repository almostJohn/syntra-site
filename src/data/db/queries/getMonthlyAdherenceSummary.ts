import { prisma } from "@/data/db/prisma";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function getMonthlyAdherenceSummary(userId: string) {
	const now = new Date();
	const start = subMonths(startOfMonth(now), 5);
	const end = endOfMonth(now);

	const data = await prisma.adherence.findMany({
		where: {
			schedule_task: {
				assigned_to_user_id: userId,
			},
			recorded_at: {
				gte: start,
				lte: end,
			},
		},
		select: {
			recorded_at: true,
			late_start: true,
			early_finish: true,
			late_finish: true,
			missed_entirely: true,
		},
	});

	const summary = Array.from({ length: 6 }).map((_, i) => {
		const date = subMonths(startOfMonth(now), 5 - i);
		const key = date.toISOString().slice(0, 10);
		return {
			month: key,
			late_start: 0,
			early_finish: 0,
			late_finish: 0,
			missed_entirely: 0,
		};
	});

	for (const item of data) {
		const key = item.recorded_at.toISOString().slice(0, 10);
		const target = summary.find((s) => s.month === key);

		if (!target) {
			continue;
		}

		if (item.late_start) target.late_start++;
		if (item.early_finish) target.early_finish++;
		if (item.late_finish) target.late_finish++;
		if (item.missed_entirely) target.missed_entirely++;
	}

	return summary;
}
