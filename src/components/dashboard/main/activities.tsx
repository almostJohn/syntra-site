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
		<div className="block p-6 bg-background border border-border rounded-xl shadow">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Activities</h3>
				<Heatmap data={heatmapData} />
			</div>
		</div>
	);
}
