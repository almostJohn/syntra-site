import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NotificationWithAuthor } from "@/data/get-notification.data";
import { formatDate, formatNameToInitials } from "@/lib/formatting";
import { cn, getAvatarURL } from "@/lib/utils";
import { MarkAsReadBtn } from "../buttons/mark-as-read-btn";
import { MarkAsUnreadBtn } from "../buttons/mark-as-unread-btn";
import { MarkAsArchivedBtn } from "../buttons/mark-as-archived-btn";

type NotificationItemProps = {
	notificationWithAuthor: NotificationWithAuthor;
};

export function NotificationItem({
	notificationWithAuthor,
}: NotificationItemProps) {
	return (
		<div className="group flex w-full cursor-pointer flex-col gap-2 p-4 whitespace-nowrap transition-colors duration-200 hover:border-l-2 hover:border-l-blue-500 hover:bg-blue-500/10 md:flex-row md:items-center md:justify-between">
			<div className="flex items-center gap-4">
				<div
					className={cn(
						"inline-flex size-2 shrink-0 animate-pulse rounded-full",
						notificationWithAuthor.status === "unread" && "bg-green-500",
						notificationWithAuthor.status === "read" && "bg-purple-500",
						notificationWithAuthor.status === "archived" && "bg-orange-500",
					)}
				/>
				<div className="flex flex-col gap-1">
					<span className="text-xs text-neutral-500 transition-colors group-hover:text-neutral-900">
						{notificationWithAuthor.id}
					</span>
					<h3 className="max-w-md text-sm text-pretty whitespace-pre-wrap text-neutral-500 transition-colors group-hover:text-neutral-900">
						{notificationWithAuthor.content}
					</h3>
				</div>
			</div>
			<div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-6">
				<div className="flex items-center gap-2">
					<div className="text-sm group-hover:underline">
						{notificationWithAuthor.author.username}
					</div>
					<Avatar className="size-8 rounded-full border border-neutral-300">
						<AvatarImage
							src={getAvatarURL(notificationWithAuthor.author.avatar!)}
							alt={notificationWithAuthor.author.username}
							className="rounded-full"
						/>
						<AvatarFallback className="size-8 rounded-full bg-neutral-200 text-neutral-900">
							{formatNameToInitials(notificationWithAuthor.author.username)}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="text-xs text-neutral-500">
					{formatDate(notificationWithAuthor.createdAt, "relative")}
				</div>
				<div className="hidden items-center md:flex">
					<div className="items-cnter hidden gap-2.5 transition-opacity group-hover:flex">
						{notificationWithAuthor.status === "unread" && (
							<>
								<MarkAsReadBtn notificationId={notificationWithAuthor.id} />
								<MarkAsArchivedBtn notificationId={notificationWithAuthor.id} />
							</>
						)}
						{notificationWithAuthor.status === "read" && (
							<>
								<MarkAsUnreadBtn notificationId={notificationWithAuthor.id} />
								<MarkAsArchivedBtn notificationId={notificationWithAuthor.id} />
							</>
						)}
						{notificationWithAuthor.status === "archived" && (
							<>
								<MarkAsUnreadBtn notificationId={notificationWithAuthor.id} />
								<MarkAsReadBtn notificationId={notificationWithAuthor.id} />
							</>
						)}
					</div>
				</div>
				<div className="mt-1 flex items-center gap-2.5 md:hidden">
					{notificationWithAuthor.status === "unread" && (
						<>
							<MarkAsReadBtn notificationId={notificationWithAuthor.id} />
							<MarkAsArchivedBtn notificationId={notificationWithAuthor.id} />
						</>
					)}
					{notificationWithAuthor.status === "read" && (
						<>
							<MarkAsUnreadBtn notificationId={notificationWithAuthor.id} />
							<MarkAsArchivedBtn notificationId={notificationWithAuthor.id} />
						</>
					)}
					{notificationWithAuthor.status === "archived" && (
						<>
							<MarkAsUnreadBtn notificationId={notificationWithAuthor.id} />
							<MarkAsReadBtn notificationId={notificationWithAuthor.id} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
