import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import { WEEKS, WEEK_DAYS } from "@/lib/constants";

type HeatmapData = Record<string, number>;

type HeatmapProps = {
	data: HeatmapData;
};

export function Heatmap({ data }: HeatmapProps) {
	const startDate = startOfWeek(subWeeks(new Date(), WEEKS - 1), {
		weekStartsOn: 1,
	});

	function getIntensity(count: number) {
		if (count === 0) return "bg-neutral-200";
		if (count <= 2) return "bg-blue-200";
		if (count <= 4) return "bg-blue-400";
		if (count <= 6) return "bg-blue-600";
		if (count <= 8) return "bg-blue-800";
		return "bg-blue-950";
	}

	return (
		<div className="w-full">
			<div
				className="grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
					gap: "2px",
				}}
			>
				{Array.from({ length: WEEKS }).map((_, weekIndex) => (
					<div key={weekIndex} className="flex flex-col gap-[2px]">
						{Array.from({ length: WEEK_DAYS }).map((_, dayIndex) => {
							const date = addDays(startDate, weekIndex * WEEK_DAYS + dayIndex);
							const dateString = format(date, "yyyy-MM-dd");
							const dayName = format(date, "EEE");
							const count = data[dateString] ?? 0;
							const intensity = getIntensity(count);

							return (
								<div
									key={dayIndex}
									title={`${dateString} (${dayName}): ${count} ${count === 1 ? "activity" : "activities"}`}
									className={`aspect-square w-full rounded cursor-pointer transition-all ${intensity} hover:scale-110`}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}
