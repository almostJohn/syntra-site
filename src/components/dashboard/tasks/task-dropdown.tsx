import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTask } from "../forms/delete-task";
import { UpdateTaskStatus } from "../forms/update-task-status";
import type { TaskStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

type TaskDropdownProps = {
	oldStatus: TaskStatus;
	taskId: string;
	projectId: string;
};

export function TaskDropdown({
	oldStatus,
	taskId,
	projectId,
}: TaskDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 px-2 hover:bg-transparent"
				>
					<Ellipsis className="size-4 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52" align="end">
				{oldStatus === "todo" && (
					<UpdateTaskStatus
						oldStatus="todo"
						newStatus="in_progress"
						taskId={taskId}
						projectId={projectId}
					/>
				)}
				{oldStatus === "in_progress" && (
					<UpdateTaskStatus
						oldStatus="in_progress"
						newStatus="done"
						taskId={taskId}
						projectId={projectId}
					/>
				)}
				{oldStatus === "done" && (
					<UpdateTaskStatus
						oldStatus="done"
						newStatus="in_progress"
						taskId={taskId}
						projectId={projectId}
					/>
				)}
				<DeleteTask taskId={taskId} projectId={projectId} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
