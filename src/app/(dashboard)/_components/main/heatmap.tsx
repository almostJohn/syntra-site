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
		if (count <= 2) return "bg-indigo-200";
		if (count <= 4) return "bg-indigo-400";
		if (count <= 6) return "bg-indigo-600";
		return "bg-indigo-800";
	}

	const dayLabels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_1fr] gap-4 items-start">
				<div className="flex flex-col justify-between text-xs text-muted-foreground h-full">
					{dayLabels.map((day, index) => (
						<div
							key={index + 1}
							className="h-full flex items-center justify-end"
						>
							{day}
						</div>
					))}
				</div>
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
								const date = addDays(
									startDate,
									weekIndex * WEEK_DAYS + dayIndex,
								);
								const dateString = format(date, "yyyy-MM-dd");
								const dayName = format(date, "EEE");
								const count = data[dateString] ?? 0;
								const intensity = getIntensity(count);

								return (
									<div
										key={dayIndex}
										title={`${dateString} (${dayName}): ${count} ${
											count === 1 ? "activity" : "activities"
										}`}
										className={`aspect-square w-3 sm:w-4 rounded cursor-pointer ${intensity} transition-all hover:bg-scale-110`}
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
