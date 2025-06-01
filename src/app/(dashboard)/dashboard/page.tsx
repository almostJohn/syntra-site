import { getCurrentUser } from "@/lib/auth";
import { MainHeader } from "../_components/main/main-header";
import { MainStats } from "../_components/main/main-stats";
import { QuickActions } from "../_components/quick-actions";
import { RecentActivity } from "../_components/recent-activity";
import { Activity } from "../_components/activity";

export default async function DashboardPage() {
	const currentUser = await getCurrentUser();

	return (
		<div className="p-6 h-full space-y-6">
			{currentUser && (
				<>
					<MainHeader displayName={currentUser.display_name} />
					<Activity userId={currentUser.id} />
					<MainStats userId={currentUser.id} />
					<QuickActions />
					<RecentActivity userId={currentUser.id} />
				</>
			)}
		</div>
	);
}
