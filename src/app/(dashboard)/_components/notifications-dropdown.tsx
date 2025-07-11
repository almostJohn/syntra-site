"use client";

import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useServerAction } from "@/hooks/use-server-action";
import { archiveNotifications } from "@/app/(dashboard)/actions/archive-notifications";
import { Separator } from "@/components/ui/separator";

type Notification = {
	type: string;
	description: string;
	isArchived: boolean;
};

type NotificationsDropdownProps = {
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

export function NotificationsDropdown({
	notifications,
}: NotificationsDropdownProps) {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	const unarchivedNotifications = notifications.filter((n) => !n.isArchived);
	const archivedNotifications = notifications.filter((n) => n.isArchived);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="cursor-pointer h-9 relative hidden md:flex"
				>
					<Icons.bell className="size-4 shrink-0" />
					{unarchivedNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-neutral-100 text-xs font-medium text-center inline-flex items-center justify-center">
							{unarchivedNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-90" align="end">
				<div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-700">
					<div className="font-medium">Notifications</div>
					{unarchivedNotifications.length > 0 && (
						<ArchiveNotifications onClose={onClose} />
					)}
				</div>
				<div className="overflow-y-auto max-h-90">
					{notifications.length === 0 && (
						<div className="px-3 py-1">
							<div className="text-sm text-center text-neutral-500">
								No new notifications.
							</div>
						</div>
					)}
					{unarchivedNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-3 py-1 bg-neutral-200/40 dark:bg-neutral-700/40 flex items-center gap-2">
								<div className="text-sm font-medium">Unarchived</div>
								<div className="text-sm">
									({unarchivedNotifications.length})
								</div>
							</div>
						</div>
					)}
					<div className="divide-y">
						{unarchivedNotifications.map((notification, index) => (
							<div
								key={index + 1}
								className="p-3 transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
							>
								<div className="flex flex-col space-y-0.5">
									<div className="font-medium text-sm">
										{LABEL[notification.type as keyof typeof LABEL]}
									</div>
									<div className="text-sm text-neutral-500 truncate">
										{notification.description}
									</div>
								</div>
							</div>
						))}
					</div>
					{unarchivedNotifications.length > 0 &&
						archivedNotifications.length > 0 && <Separator />}
					{archivedNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-3 py-1 bg-neutral-200/40 dark:bg-neutral-700/40 flex items-center gap-2">
								<div className="text-sm font-medium">Archived</div>
								<div className="text-sm">({archivedNotifications.length})</div>
							</div>
						</div>
					)}
					<div className="divide-y">
						{archivedNotifications.map((notification, index) => (
							<div
								key={index + 1}
								className="p-3 transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
							>
								<div className="flex flex-col space-y-0.5">
									<div className="font-medium text-sm">
										{LABEL[notification.type as keyof typeof LABEL]}
									</div>
									<div className="text-sm text-neutral-500 truncate">
										{notification.description}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ArchiveNotifications({ onClose }: { onClose(): void }) {
	const { formAction, isPending } = useServerAction(
		archiveNotifications,
		initialState,
	);

	return (
		<form
			action={() => {
				formAction(undefined);
				onClose();
			}}
		>
			<Button
				disabled={isPending}
				variant="ghost"
				size="sm"
				className="cursor-pointer text-xs"
			>
				{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Archive"}
			</Button>
		</form>
	);
}
