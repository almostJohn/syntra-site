import { TaskHeatmap } from "./task-heatmap";
import { getUserTaskHeatmapWeeks } from "@/data/db/queries/getUserTaskHeatmapWeeks";

type ActivitiesProps = {
	userId: string;
};

export async function Activities({ userId }: ActivitiesProps) {
	const heatmapWeeks = await getUserTaskHeatmapWeeks(userId);

	const flatDays = heatmapWeeks.flat();

	const heatmapData = flatDays.reduce<Record<string, number>>((acc, day) => {
		acc[day.date] = day.count;
		return acc;
	}, {});

	return (
		<div className="block p-6 bg-background border border-border rounded-md shadow">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Activities</h3>
				<TaskHeatmap data={heatmapData} />
			</div>
		</div>
	);
}
