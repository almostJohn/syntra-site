"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Loader } from "lucide-react";
import { markAsRead } from "@/actions/notifications/mark-as-read";

type Notification = {
	type: string;
	message: string;
	is_read: boolean;
};

type UserNotificationsProps = {
	notifications: Notification[];
};

const LABEL = {
	SCHEDULE_TASK_ASSIGNMENT: "Schedule Task Assignment",
	CREATE_TASK: "Task Created",
	DELETE_TASK: "Task Deleted",
	UPDATE_USER: "Update User",
	UPDATE_TEAM: "Update Team",
	REMINDER: "Reminder",
	ALERT: "Alert",
	INFO: "Info",
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UserNotifications({ notifications }: UserNotificationsProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		markAsRead,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.refresh();
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state, router]);

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	const unreadNotifications = notifications.filter(
		(notification) => !notification.is_read,
	);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					className="relative transition-all cursor-pointer active:scale-95"
				>
					<Bell className="size-5 shrink-0" />
					{unreadNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 size-5 bg-red-600 rounded-full text-white text-xs text-center inline-flex items-center justify-center">
							{unreadNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-96" align="end">
				<div className="flex items-center justify-between px-4 py-2 border-b border-border">
					<h4 className="font-medium">Notifications</h4>
					{unreadNotifications.length > 0 && (
						<form
							action={() => {
								formAction();
								handleClose();
							}}
						>
							<Button
								type="submit"
								variant="ghost"
								size="sm"
								disabled={isPending}
								className="text-xs cursor-pointer text-blue-600 hover:text-blue-700"
							>
								{isPending ? (
									<Loader className="size-4 animate-spin" />
								) : (
									"Mark all as read"
								)}
							</Button>
						</form>
					)}
				</div>
				<div className="max-h-80 overflow-y-auto">
					{unreadNotifications.length === 0 ? (
						<div className="p-4">
							<p className="text-sm text-center text-muted-foreground">
								No new notifications
							</p>
						</div>
					) : (
						unreadNotifications.map((notification, index) => (
							<div
								key={index}
								className="p-4 border-b border-border transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
							>
								<div className="flex items-start gap-3">
									<div className="flex items-center justify-center size-8 bg-blue-50 text-blue-600 rounded-full mt-1">
										<Bell className="size-4 text-blue-600" />
									</div>
									<div className="flex flex-col space-y-0.5">
										<p className="text-sm font-medium">
											{LABEL[notification.type as keyof typeof LABEL]}
										</p>
										<p className="text-xs text-muted-foreground">
											{notification.message}
										</p>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
