import Link from "next/link";
import { Bell } from "lucide-react";
import { and, eq, sql } from "drizzle-orm";
import type { User } from "@/types";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { notifications as notificationsTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CurrentUser = Omit<
	User,
	"password" | "avatarSize" | "createdAt" | "updatedAt"
>;

type NavbarProps = {
	user: CurrentUser;
};

export async function Navbar({ user }: NavbarProps) {
	const { data: response } = await request.get({
		action: async () => {
			const [{ count }] = await db
				.select({
					count: sql<number>`count(*)`,
				})
				.from(notificationsTable)
				.where(
					and(
						eq(notificationsTable.isRead, false),
						eq(notificationsTable.userId, user.id),
					),
				);

			return { count };
		},
	});

	const count = Number(response?.count ?? 0);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-300 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60">
			<div className="flex h-18 items-center justify-between px-4 sm:px-6 md:px-8">
				<Link
					href="/dashboard"
					className="text-2xl leading-tight font-bold tracking-tighter"
				>
					Syntra
				</Link>
				<div className="flex items-center justify-end gap-2.5">
					<Link
						href="/dashboard"
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "icon",
								className:
									"relative hidden size-9 rounded-full px-2 md:inline-flex",
							}),
						)}
						title={
							count === 0
								? "You have no notifications."
								: `You have ${count} unread ${count === 1 ? "notification" : "notifications"}.`
						}
					>
						<Bell className="size-6 shrink-0" />
						{count > 0 && (
							<div className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-teal-500 text-center text-xs font-medium text-white">
								{count}
							</div>
						)}
					</Link>
				</div>
			</div>
		</header>
	);
}
