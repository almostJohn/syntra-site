import { ActivityHeatmap } from "./activity-heatmap";
import { getUserActivityHeatmapData } from "@/data/queries";

type ActivityHeatmapMainProps = {
	userId: string;
};

export async function ActivityHeatmapMain({
	userId,
}: ActivityHeatmapMainProps) {
	const heatmapData = await getUserActivityHeatmapData(userId, 12);

	return <ActivityHeatmap heatmapData={heatmapData} />;
}
