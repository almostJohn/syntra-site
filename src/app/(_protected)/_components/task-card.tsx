"use client";

import { useState } from "react";
import type { Task } from "@/lib/data.types";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatting";

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
				"inline-flex cursor-pointer items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
				style,
				className,
			)}
		>
			{label}
		</span>
	);
};

export function TaskCard({ task, projectId }: TaskCardProps) {
	const [interacted, setInteracted] = useState(false);

	function handleModalInteraction() {
		setInteracted((prev) => !prev);
	}

	return (
		<>
			<div className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 transition-all hover:bg-neutral-800">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleModalInteraction}
						className="cursor-pointer text-base leading-tight font-semibold underline-offset-4 hover:underline"
					>
						{task.title}
					</button>
					<TaskBadge priority={task.priority} />
					<TaskBadge category={task.category} />
				</div>
			</div>

			<Dialog open={interacted} onOpenChange={setInteracted}>
				<DialogContent className="w-full rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-xl sm:max-w-2xl">
					<VisuallyHidden>
						<DialogTitle>Hidden Title</DialogTitle>
						<DialogDescription>Hidden Description</DialogDescription>
					</VisuallyHidden>
					<div className="flex flex-col gap-4 p-6">
						<div className="flex items-center justify-start">
							<TaskBadge status={task.status} />
						</div>
						<h2 className="text-lg leading-tight font-semibold">
							{task.title}
						</h2>
						<div className="flex items-center gap-3">
							<TaskBadge priority={task.priority} />
							<TaskBadge category={task.category} />
						</div>
						{task.subtitle && task.content && (
							<div className="grid gap-2">
								<h3 className="text-base/8 font-medium">{task.subtitle}</h3>
								<p className="text-muted-foreground text-sm whitespace-pre-wrap">
									{task.content}
								</p>
							</div>
						)}
						<div className="mt-auto flex items-center gap-2">
							<p className="text-xs">{formatDate(task.createdAt, "long")}</p>
							<p className="text-xs">
								({formatDate(task.createdAt, "relative")})
							</p>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
