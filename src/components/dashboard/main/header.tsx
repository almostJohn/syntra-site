import { UserNotifications } from "./user-notifications";
import { getUserNotifications } from "@/data/db/queries/get-user-notifications";

type HeaderProps = {
	userId: string;
};

export async function Header({ userId }: HeaderProps) {
	const notifications = await getUserNotifications(userId);

	return (
		<div className="flex justify-between">
			<h3 className="text-3xl font-bold">My Dashboard</h3>
			<div>
				<UserNotifications notifications={notifications} />
			</div>
		</div>
	);
}
