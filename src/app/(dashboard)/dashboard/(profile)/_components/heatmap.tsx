import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import { WEEKS, WEEK_DAYS } from "@/lib/constants";

type HeatmapData = Record<string, number>;

type HeatmapDataProps = {
	data: HeatmapData;
};

export function Heatmap({ data }: HeatmapDataProps) {
	const startDate = startOfWeek(subWeeks(new Date(), WEEKS - 1), {
		weekStartsOn: 1,
	});

	function getIntensity(count: number) {
		if (count === 0) return "bg-neutral-200 dark:bg-neutral-700";
		if (count <= 2) return "bg-emerald-200";
		if (count <= 4) return "bg-emerald-400";
		if (count <= 6) return "bg-emerald-600";
		return "bg-emerald-700";
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
							const day = format(date, "EEE");
							const count = data[dateString] ?? 0;
							const intensity = getIntensity(count);

							return (
								<div
									key={dayIndex}
									title={`${dateString} (${day}): ${count} ${
										count === 1 ? "activity" : "activities"
									}`}
									className={`aspect-square w-full rounded-xs cursor-pointer transition-all ${intensity} hover:scale-110`}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}
