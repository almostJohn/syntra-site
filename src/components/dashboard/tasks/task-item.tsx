"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { ActionResponse } from "@/lib/server-action";
import { markTaskAsComplete } from "@/actions/tasks/mark-task-as-complete";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { DeleteTask } from "./delete-task";

type TaskItemProps = {
	id: string;
	title: string | null;
	subtitle: string | null;
	content: string;
	is_completed: boolean;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function TaskItem({
	id,
	title,
	subtitle,
	content,
	is_completed,
}: TaskItemProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string; complete: boolean },
		) => {
			return await markTaskAsComplete(payload.taskId, payload.complete);
		},
		initialState,
	);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	return (
		<Card className="flex flex-col h-full transition-shadow hover:shadow-md">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<CardTitle className="text-lg font-semibold text-neutral-800 mb-1">
							{title || "Untitled"}
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							{subtitle || "Not specified"}
						</p>
					</div>
					<DeleteTask taskId={id} />
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<p className="text-neutral-700 leading-relaxed">{content}</p>
			</CardContent>
			<CardFooter className="mt-auto pt-0">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-neutral-700">
							Status:
						</span>
						<Badge
							className={cn(
								"rounded-full",
								is_completed
									? "bg-green-50 border border-green-600 text-green-600"
									: "bg-red-50 border border-red-600 text-red-600",
							)}
						>
							{is_completed ? "Completed" : "Not Completed"}
						</Badge>
					</div>
					<form
						action={() => {
							formAction({ taskId: id, complete: !is_completed });
						}}
					>
						<Button
							type="submit"
							variant={!is_completed ? "primary" : "outline"}
							disabled={isPending}
							className="cursor-pointer"
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : is_completed ? (
								"Mark Incomplete"
							) : (
								"Mark Complete"
							)}
						</Button>
					</form>
				</div>
			</CardFooter>
		</Card>
	);
}
