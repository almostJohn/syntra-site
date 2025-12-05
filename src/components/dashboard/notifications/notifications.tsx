import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { desc, eq } from "drizzle-orm";
import { notifications as notificationsTable } from "@/db/schema";
import { NotificationList } from "./notification-list";
import { Empty, EmptyHeading, EmptyText } from "@/components/ui/empty";

export async function Notifications({ userId }: { userId: string }) {
	const { data: response } = await request.get({
		fn: async () => {
			const notifications = await db
				.select()
				.from(notificationsTable)
				.where(eq(notificationsTable.userId, userId))
				.orderBy(desc(notificationsTable.createdAt))
				.limit(15);

			return { notifications };
		},
	});

	if (response?.notifications.length === 0) {
		return (
			<Empty className="mt-24 border-none">
				<EmptyHeading>No Notifications</EmptyHeading>
				<EmptyText>You have no notifications at this time.</EmptyText>
			</Empty>
		);
	}

	return <NotificationList notifications={response?.notifications || []} />;
}
