"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { archiveNotifications } from "@/app/(private)/actions/archive-notifications";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";

type Notification = {
	id: string;
	description: string;
	isArchived: boolean;
};

type NotificationsDropdownProps = {
	notifications: Notification[];
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function NotificationsDropdown({
	notifications,
}: NotificationsDropdownProps) {
	const { formAction, isPending } = useServerAction(
		archiveNotifications,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	const unarchivedNotifications = notifications.filter(
		(notification) => !notification.isArchived,
	);

	const archivedNotifications = notifications.filter(
		(notification) => notification.isArchived,
	);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="h-9 cursor-pointer relative hidden md:flex"
				>
					<Icons.bell className="size-5 shrink-0" />
					{unarchivedNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-neutral-100 text-xs font-medium text-center inline-flex items-center justify-center">
							{unarchivedNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-90 p-0" align="end">
				<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
					<div className="font-medium">Notifications</div>
					{unarchivedNotifications.length > 0 && (
						<form
							action={() => {
								formAction(undefined);
								onClose();
							}}
						>
							<Button
								type="submit"
								variant="ghost"
								size="sm"
								className="cursor-pointer h-8 text-xs"
								disabled={isPending}
							>
								{isPending ? (
									<Icons.loading className="size-4 shrink-0" />
								) : (
									"Archive"
								)}
							</Button>
						</form>
					)}
				</div>
				<div className="overflow-y-auto max-h-90">
					{notifications.length === 0 && (
						<div className="px-4 py-2 flex justify-center text-center text-sm text-neutral-500">
							No new notifications.
						</div>
					)}
					{unarchivedNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-4 py-2 bg-neutral-200/60 dark:bg-neutral-700/60 flex items-center gap-2">
								<div className="text-sm font-medium">Unarchived</div>
								<div className="text-sm">
									({unarchivedNotifications.length})
								</div>
							</div>
						</div>
					)}
					<div className="divide-y">
						{unarchivedNotifications.map((notification) => (
							<div
								key={notification.id}
								className="p-4 cursor-pointer transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
							>
								<div className="flex items-center gap-3">
									<div className="rounded-full size-3.5 shrink-0 bg-blue-400 animate-pulse" />
									<div className="text-sm text-neutral-500 whitespace-pre-wrap">
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
							<div className="px-4 py-2 bg-neutral-200/60 dark:bg-neutral-700/60 flex items-center gap-2">
								<div className="text-sm font-medium">Archived</div>
								<div className="text-sm">({archivedNotifications.length})</div>
							</div>
						</div>
					)}
					<div className="divide-y">
						{archivedNotifications.map((notification) => (
							<div
								key={notification.id}
								className="p-4 cursor-pointer transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
							>
								<div className="flex items-center gap-3">
									<Icons.check className="size-3.5 shrink-0" />
									<div className="text-sm text-neutral-500 whitespace-pre-wrap">
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
