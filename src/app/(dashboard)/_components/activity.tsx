import { Activities } from "./activities";
import { getUserActivityHeatmapData } from "@/data/queries";

type ActivityProps = {
	userId: string;
};

export async function Activity({ userId }: ActivityProps) {
	const userActivities = await getUserActivityHeatmapData(userId, 12);

	return (
		<div className="block p-6 bg-background border border-border rounded-md shadow overflow-hidden w-full">
			<div className="flex flex-col">
				<h3 className="text-lg font-semibold mb-4">Your Activity</h3>
				<div className="w-full">
					<Activities data={userActivities} />
				</div>
			</div>
		</div>
	);
}
