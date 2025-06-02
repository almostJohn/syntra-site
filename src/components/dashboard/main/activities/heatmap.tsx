import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import { WEEK_DAYS, WEEKS } from "@/lib/constants";

type HeatmapData = Record<string, number>;

type HeatmapProps = {
	data: HeatmapData;
};

const dayLabels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export function Heatmap({ data }: HeatmapProps) {
	const startDate = startOfWeek(subWeeks(new Date(), WEEKS - 1), {
		weekStartsOn: 1,
	});

	function getActivityIntensity(count: number) {
		if (count === 0) return "bg-neutral-200";
		if (count <= 2) return "bg-emerald-200";
		if (count <= 5) return "bg-emerald-500";
		if (count <= 7) return "bg-emerald-700";
		return "bg-emerald-800";
	}

	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_1fr] gap-4 items-start">
				<div className="flex flex-col justify-between text-xs text-muted-foreground h-full">
					{dayLabels.map((day, index) => (
						<div
							key={index}
							className="h-full flex items-center justify-end pr-2"
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

								const count = data[dateString] ?? 0;

								const intensity = getActivityIntensity(count);

								return (
									<div
										key={dayIndex}
										className={`aspect-square cursor-pointer w-full rounded-sm ${intensity} hover:scale-110 transition-transform`}
										title={`${dateString}: ${count} activities`}
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
