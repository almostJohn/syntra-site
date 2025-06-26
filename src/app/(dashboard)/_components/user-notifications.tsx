"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { markAsArchived } from "@/actions/notifications/mark-as-archived";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Check, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
	CREATE_NOTE: "Note Created",
	UPDATE_NOTE: "Note Updated",
	DELETE_NOTE: "Note Deleted",
	CREATE_USER: "User Created",
	UPDATE_USER: "User Updated",
	DELETE_USER: "User Deleted",
	ALERT: "Alert",
	INFO: "Info",
	REMINDER: "Reminder",
};

const initialState = {
	success: {
		statusCode: 0,
		message: "",
	},
	error: {
		statusCode: 0,
		message: "",
	},
};

export function UserNotifications({ notifications }: UserNotificationsProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		markAsArchived,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
			router.refresh();
		} else if (state.error?.message) {
			toast.error(state.error.message);
		}
	}, [state, router]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	const unreadNotifications = notifications.filter(
		(notification) => !notification.isArchived,
	);
	const readNotifications = notifications.filter(
		(notification) => notification.isArchived,
	);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="relative hidden transition-all cursor-pointer md:flex"
				>
					<Bell className="size-5 shrink-0" />
					{unreadNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#5865f2] text-white text-xs text-center inline-flex items-center justify-center">
							{unreadNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-90" align="end">
				<div className="flex items-center justify-between px-4 py-2 border-b border-border">
					<h4 className="font-medium">Notifications</h4>
					{unreadNotifications.length > 0 && (
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
								disabled={isPending}
								className="text-xs cursor-pointer text-[#5865f2] hover:text-[#5865f2]/80"
							>
								{isPending ? (
									<Loader className="size-4 animate-spin" />
								) : (
									"Archived"
								)}
							</Button>
						</form>
					)}
				</div>
				<ScrollArea className="max-h-80 overflow-y-auto">
					{notifications.length === 0 && (
						<div className="px-4 py-2 bg-muted/50">
							<p className="text-center text-sm text-muted-foreground">
								No new notifications.
							</p>
						</div>
					)}
					{unreadNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-4 py-2 bg-muted/50">
								<h4 className="text-sm text-muted-foreground font-medium">
									Unread ({unreadNotifications.length})
								</h4>
							</div>
							<div className="divide-y">
								{unreadNotifications.map((notification, index) => (
									<div
										key={index + 1}
										className="p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
									>
										<div className="flex items-center space-x-3">
											<div className="flex items-center justify-center size-9 rounded-sm bg-[#5865f2]/10 text-[#5865f2]">
												<Bell className="size-4 shrink-0 text-[#5865f2]" />
											</div>
											<div className="flex flex-col space-y-0.5">
												<h3 className="text-sm font-medium">
													{LABEL[notification.type as keyof typeof LABEL]}
												</h3>
												<p className="text-sm text-muted-foreground truncate">
													{notification.description}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					{unreadNotifications.length > 0 && readNotifications.length > 0 && (
						<Separator />
					)}
					{readNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="px-4 py-2 bg-muted/50">
								<h4 className="text-sm font-medium text-muted-foreground">
									Read ({readNotifications.length})
								</h4>
							</div>
							<div className="divide-y">
								{readNotifications.map((notification, index) => (
									<div
										key={index + 1}
										className="p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
									>
										<div className="flex items-center space-x-3">
											<div className="flex items-center justify-center size-9 rounded-sm bg-[#5865f2]/10 text-[#5865f2]">
												<Check className="size-4 shrink-0 text-[#5865f2]" />
											</div>
											<div className="flex flex-col space-y-0.5">
												<h3 className="text-sm font-medium">
													{LABEL[notification.type as keyof typeof LABEL]}
												</h3>
												<p className="text-sm text-muted-foreground truncate">
													{notification.description}
												</p>
											</div>
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
