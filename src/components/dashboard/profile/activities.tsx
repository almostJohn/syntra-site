import { Heatmap } from "./heatmap";
import { getUserActivities } from "@/data/db/queries/get-user-activities";

type ActivitiesProps = {
	userId: string;
};

export async function Activities({ userId }: ActivitiesProps) {
	const heatmapWeeks = await getUserActivities(userId);

	const flatDays = heatmapWeeks.flat();

	const heatmapData = flatDays.reduce<Record<string, number>>((acc, day) => {
		acc[day.date] = day.count;
		return acc;
	}, {});

	return (
		<div className="flex flex-col space-y-2">
			<h2 className="text-lg font-bold">Your Activity</h2>
			<div className="border border-border p-2 bg-transparent rounded-md">
				<Heatmap data={heatmapData} />
			</div>
		</div>
	);
}
