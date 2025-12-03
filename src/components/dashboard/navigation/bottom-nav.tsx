import { NavItems } from "./nav-items";
import { db } from "@/db/sql";
import { notifications as notificationsTable } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { request } from "@/lib/request";
import type { CurrentUser } from "@/types";

type BottomNavProps = {
	user: CurrentUser;
};

export async function BottomNav({ user }: BottomNavProps) {
	const { data: response } = await request.get({
		fn: async () => {
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
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-300 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 md:hidden">
			<NavItems notificationCount={count} />
		</div>
	);
}
