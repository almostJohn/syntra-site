import { Heatmap } from "./heatmap";
import { getTaskActivities } from "@/data/queries/get-task-activities";

type ActivitiesProps = {
	userId: string;
};

export async function Activities({ userId }: ActivitiesProps) {
	const activities = await getTaskActivities(userId);
	const flat = activities.flat();
	const heatmapData = flat.reduce<Record<string, number>>((acc, day) => {
		acc[day.date] = day.count;
		return acc;
	}, {});

	return (
		<div className="flex flex-col space-y-3.5">
			<h3 className="font-bold">Your Activities</h3>
			<div className="border border-neutral-200 dark:border-neutral-700 bg-transparent p-2 rounded-sm">
				<Heatmap data={heatmapData} />
			</div>
		</div>
	);
}
