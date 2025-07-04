"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { archiveNotifications } from "../actions/archive-notifications";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/toast-provider";

type Notification = {
	type: string;
	description: string;
	isArchived: boolean;
};

type UserNotificationsProps = {
	notifications: Notification[];
};

const LABEL = {
	CREATE_TASK: "Task Created",
	UPDATE_TASK: "Task Updated",
	DELETE_TASK: "Task Deleted",
	CREATE_PROJECT: "Project Created",
	UPDATE_PROJECT: "Project Updated",
	DELETE_PROJECT: "Project Deleted",
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UserNotifications({ notifications }: UserNotificationsProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		archiveNotifications,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
			router.refresh();
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, router, addToast]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	const unArchivedNotifications = notifications.filter((n) => !n.isArchived);
	const archivedNotifications = notifications.filter((n) => n.isArchived);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					className="cursor-pointer h-9 relative hidden md:flex"
				>
					<Icons.bell className="size-4 shrink-0" />
					{unArchivedNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-neutral-100 text-xs font-medium text-center inline-flex items-center justify-center">
							{unArchivedNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-90" align="end">
				<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
					<h4 className="font-medium">Notifications</h4>
					{unArchivedNotifications.length > 0 && (
						<form
							action={() => {
								formAction();
								onCloseHandler();
							}}
						>
							<Button
								type="submit"
								variant="ghost"
								size="sm"
								className="rounded-sm text-xs cursor-pointer"
								disabled={isPending}
							>
								{isPending ? (
									<Icons.loading className="size-4 shrink-0" />
								) : (
									"Archived"
								)}
							</Button>
						</form>
					)}
				</div>
				<ScrollArea className="max-h-90 overflow-y-auto">
					{notifications.length === 0 && (
						<div className="px-4 py-2">
							<p className="text-sm text-center text-neutral-500">
								No new notifications.
							</p>
						</div>
					)}
					{unArchivedNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-4 py-2 bg-neutral-200/40 dark:bg-neutral-700/40 flex items-center gap-2">
								<h4 className="text-sm font-medium">Unarchived/Unread</h4>
								<span className="text-sm">
									({unArchivedNotifications.length})
								</span>
							</div>
							<div className="divide-y">
								{unArchivedNotifications.map((n, index) => (
									<div
										key={index + 1}
										className="p-4 transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
									>
										<div className="flex flex-col space-y-0.5">
											<span className="text-sm font-semibold">
												{LABEL[n.type as keyof typeof LABEL]}
											</span>
											<span className="text-xs text-neutral-600 dark:text-neutral-300">
												{n.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					{unArchivedNotifications.length > 0 &&
						archivedNotifications.length > 0 && <Separator />}
					{archivedNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-4 py-2 bg-neutral-200/40 dark:bg-neutral-700/40 flex items-center gap-2">
								<h4 className="text-sm font-medium">Archived/Read</h4>
								<span className="text-sm">
									({archivedNotifications.length})
								</span>
							</div>
							<div className="divide-y">
								{archivedNotifications.map((n, index) => (
									<div
										key={index + 1}
										className="p-4 transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
									>
										<div className="flex flex-col space-y-0.5">
											<span className="text-sm font-medium">
												{LABEL[n.type as keyof typeof LABEL]}
											</span>
											<span className="text-xs text-neutral-600 dark:text-neutral-300">
												{n.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
