"use client";

import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { DeleteTask } from "./delete-task";
import { UpdateTaskStatus } from "./update-task-status";

type Task = {
	id: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskDropdownProps = {
	task: Task;
	projectId: string;
};

export function TaskDropdown({ task, projectId }: TaskDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const [isBackward] = useState(true);
	const [isForward] = useState(true);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
				>
					<Icons.dotsHorizontal className="size-4 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full sm:max-w-sm p-0" align="end">
				<div className="flex flex-col">
					{isForward && task.status === "INCOMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							label="Move right"
							onClose={onClose}
						/>
					)}
					{isForward && isBackward && task.status === "IN_PROGRESS" && (
						<>
							<UpdateTaskStatus
								projectId={projectId}
								taskId={task.id}
								status="COMPLETE"
								label="Move right"
								onClose={onClose}
							/>
							<UpdateTaskStatus
								projectId={projectId}
								taskId={task.id}
								status="INCOMPLETE"
								label="Move left"
								onClose={onClose}
							/>
						</>
					)}
					{isBackward && task.status === "COMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							label="Move left"
							onClose={onClose}
						/>
					)}
					<DeleteTask projectId={projectId} taskId={task.id} />
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
