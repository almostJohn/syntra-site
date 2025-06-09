import { LayoutGrid, Settings, BarChart2, Sparkle } from "lucide-react";
import { UserNotifications } from "./user-notifications";
import { getUserNotifications } from "@/data/db/queries/getUserNotifications";

type HeaderProps = {
	userId: string;
	name: string;
};

export async function Header({ userId, name }: HeaderProps) {
	const notifications = await getUserNotifications(userId);

	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<HeaderDescription name={name} />
			</div>
			<div className="flex">
				<UserNotifications notifications={notifications} />
			</div>
		</div>
	);
}

function HeaderDescription({ name }: { name: string }) {
	return (
		<p className="text-muted-foreground mt-2">
			Welcome,{" "}
			<span className="font-semibold text-accent-foreground">{name}</span>! This
			is your{" "}
			<span className="inline-flex items-center space-x-1 text-blue-600">
				<LayoutGrid className="size-3 shrink-0" />
				<span>Dashboard</span>
			</span>
			. From here, you can easily access your{" "}
			<span className="inline-flex items-center space-x-1 text-orange-600">
				<Settings className="size-3 shrink-0" />
				<span>Account Settings</span>
			</span>
			, view your{" "}
			<span className="inline-flex items-center space-x-1 text-purple-600">
				<BarChart2 className="size-3 shrink-0" />
				<span>Recent Activity</span>
			</span>
			, and explore available{" "}
			<span className="inline-flex items-center space-x-1 text-rose-600">
				<Sparkle className="size-3 shrink-0" />
				<span>Features</span>
			</span>
			.
		</p>
	);
}
