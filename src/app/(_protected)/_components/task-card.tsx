import type { Task } from "@/lib/data.types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatting";
import { Calendar } from "lucide-react";

type TaskCardProps = {
	task: Task;
	projectId: string;
};

type Status = "backlog" | "todo" | "in_progress" | "complete";
type Priority = "critical" | "high" | "medium" | "low";
type Category = "feature" | "bug" | "docs" | "refactor";

type TaskBadgeProps = {
	status?: Status;
	priority?: Priority;
	category?: Category;
	className?: string;
};

const formatLabel = (label?: string) => {
	if (!label) return "";
	return label
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const TaskBadge = ({
	status,
	priority,
	category,
	className,
}: TaskBadgeProps) => {
	const statusStyles: Record<Status, string> = {
		backlog: "bg-blue-500 text-white",
		todo: "bg-purple-500 text-white",
		in_progress: "bg-orange-500 text-white",
		complete: "bg-green-500 text-white",
	};

	const priorityStyles: Record<Priority, string> = {
		critical: "bg-red-500 text-white",
		high: "bg-orange-500 text-white",
		medium: "bg-sky-500 text-white",
		low: "bg-green-500 text-white",
	};

	const categoryStyles: Record<Category, string> = {
		feature: "border border-blue-500 text-blue-500 bg-blue-500/10",
		bug: "border border-red-500 text-red-500 bg-red-500/10",
		docs: "border border-sky-500 text-sky-500 bg-sky-500/10",
		refactor: "border border-purple-500 text-purple-500 bg-purple-500/10",
	};

	const label = formatLabel(status ?? priority ?? category);
	const style = status
		? statusStyles[status]
		: priority
			? priorityStyles[priority]
			: category
				? categoryStyles[category]
				: "";

	return (
		<span
			className={cn(
				"inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-0.5 text-xs font-medium whitespace-nowrap",
				style,
				className,
			)}
		>
			{label}
		</span>
	);
};

export function TaskCard({ task, projectId }: TaskCardProps) {
	return (
		<div className="flex flex-col rounded-sm border border-neutral-800 p-4 shadow-lg">
			<div className="mb-3">
				<TaskBadge status={task.status} />
			</div>
			<div className="mb-3 flex flex-col gap-2">
				<h3 className="line-clamp-2 font-semibold">{task.title}</h3>
				{task.subtitle && (
					<h4 className="line-clamp-2 text-sm font-medium">{task.subtitle}</h4>
				)}
				{task.content && (
					<p className="text-sm text-pretty whitespace-pre-wrap text-neutral-400">
						{task.content}
					</p>
				)}
				<div className="flex flex-wrap gap-1.5">
					<TaskBadge priority={task.priority} />
					<TaskBadge category={task.category} />
				</div>
			</div>
			<div className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-3">
				<div className="flex items-center gap-1 text-xs text-neutral-500">
					<Calendar className="size-3.5 shrink-0" />
					{formatDate(new Date(task.createdAt), "short")}
				</div>
			</div>
		</div>
	);
}
