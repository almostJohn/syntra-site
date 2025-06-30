"use client";

import { useActionState, useEffect } from "react";
import {
	markTaskAsIncomplete,
	markTaskAsInProgress,
	markTaskAsComplete,
} from "../../../action";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Icons } from "@/components/icons";
import type { ActionResponse } from "@/lib/server-action";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function MarkTaskAsIncomplete({
	taskId,
	isBackward,
}: {
	taskId: string;
	isBackward?: boolean;
}) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await markTaskAsIncomplete(payload.taskId);
		},
		initialState,
	);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	return (
		<form
			action={() => {
				formAction({ taskId });
			}}
		>
			<Button
				type="submit"
				variant="ghost"
				disabled={isPending}
				size="sm"
				className="cursor-pointer h-8 px-2 group"
			>
				{isPending ? (
					<Icons.loading className="size-4 shrink-0" />
				) : (
					<>
						{isBackward && (
							<>
								<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
								Back
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}

export function MarkTaskAsInProgress({
	taskId,
	isBackward,
	isForward,
}: {
	taskId: string;
	isBackward?: boolean;
	isForward?: boolean;
}) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await markTaskAsInProgress(payload.taskId);
		},
		initialState,
	);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	return (
		<form
			action={() => {
				formAction({ taskId });
			}}
		>
			<Button
				type="submit"
				variant="ghost"
				disabled={isPending}
				size="sm"
				className="cursor-pointer h-8 px-2 group"
			>
				{isPending ? (
					<Icons.loading className="size-4 shrink-0" />
				) : (
					<>
						{isBackward && (
							<>
								<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
								Back
							</>
						)}
						{isForward && (
							<>
								Forward
								<ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}

export function MarkTaskAsComplete({
	taskId,
	isForward,
}: {
	taskId: string;
	isForward?: boolean;
}) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await markTaskAsComplete(payload.taskId);
		},
		initialState,
	);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	return (
		<form
			action={() => {
				formAction({ taskId });
			}}
		>
			<Button
				type="submit"
				variant="ghost"
				disabled={isPending}
				size="sm"
				className="cursor-pointer h-8 px-2 group"
			>
				{isPending ? (
					<Icons.loading className="size-4 shrink-0" />
				) : (
					<>
						{isForward && (
							<>
								Complete
								<ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}
