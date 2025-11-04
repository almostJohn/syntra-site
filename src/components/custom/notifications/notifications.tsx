import { getNotificationsAction } from "@/server-actions/notifications/get-notifications-action";
import { NotificationList } from "./notification-list";

export async function Notifications() {
	const initial = await getNotificationsAction(1, 10);

	return (
		<NotificationList
			initialData={initial.data}
			action={getNotificationsAction}
		/>
	);
}
