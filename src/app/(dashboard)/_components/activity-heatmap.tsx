"use client";

import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import { WEEK_DAYS, WEEKS } from "@/lib/constants";

type HeatmapData = Record<string, number>;

type ActivityHeatmapProps = {
	heatmapData: HeatmapData;
};

export function ActivityHeatmap({ heatmapData }: ActivityHeatmapProps) {
	const startDate = startOfWeek(subWeeks(new Date(), WEEKS - 1), {
		weekStartsOn: 1,
	});

	function getIntensity(count: number) {
		if (count === 0) return "bg-gray-100";
		if (count <= 2) return "bg-green-300";
		if (count <= 5) return "bg-green-400";
		if (count <= 7) return "bg-green-600";
		return "bg-green-800";
	}

	const weeksArray = Array.from({ length: WEEKS });
	const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return (
		<div className="flex flex-col p-6 bg-background rounded-md shadow border border-border w-full overflow-hidden">
			<h3 className="text-lg font-semibold mb-4">Activity</h3>
			<div className="flex">
				<div className="flex flex-col justify-between mr-3.5 text-xs text-gray-500">
					{dayLabels.map((day, index) => (
						<div key={index} className="h-3 flex items-center">
							{day}
						</div>
					))}
				</div>
				<div className="flex items-center space-x-1.5">
					{weeksArray.map((_, weekIndex) => (
						<div key={weekIndex} className="flex flex-col space-y-1.5">
							{Array.from({ length: WEEK_DAYS }).map((_, dayIndex) => {
								const date = addDays(
									startDate,
									weekIndex * WEEK_DAYS + dayIndex,
								);
								const dateStr = format(date, "yyyy-MM-dd");
								const count = heatmapData[dateStr] ?? 0;
								const intensity = getIntensity(count);

								return (
									<div
										key={dayIndex}
										className={`size-3 rounded cursor-pointer ${intensity}`}
										title={`${dateStr}: ${count} activities`}
									/>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
