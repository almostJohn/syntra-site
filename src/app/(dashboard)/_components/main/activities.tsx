import { Heatmap } from "./heatmap";
import { getUserActivities } from "@/data/queries/get-user-activities";

type ActivitiesProps = {
	userId: string;
};

export async function Activities({ userId }: ActivitiesProps) {
	const activities = await getUserActivities(userId);
	const flat = activities.flat();
	const data = flat.reduce<Record<string, number>>((acc, day) => {
		acc[day.date] = day.count;
		return acc;
	}, {});

	return (
		<div className="p-6 hidden bg-muted/40 rounded-md border border-border shadow-md md:flex">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Your Activities</h3>
				<Heatmap data={data} />
			</div>
		</div>
	);
}
