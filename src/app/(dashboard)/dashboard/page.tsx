import { getCurrentUser } from "@/lib/auth";
import { Header } from "@/components/dashboard/main/header";
import { Activity } from "@/components/dashboard/main/activities/activity";
import { Stats } from "@/components/dashboard/main/stats/stats";
import { QuickActions } from "@/components/dashboard/main/quick-actions";
import { RecentActivity } from "@/components/dashboard/main/recent-activity";

export default async function DashboardPage() {
	const currentUser = await getCurrentUser();

	return (
		<div className="p-6 min-h-screen space-y-6 bg-muted">
			{currentUser && (
				<>
					<Header displayName={currentUser.display_name} />
					<Activity userId={currentUser.id} />
					<Stats userId={currentUser.id} />
					<QuickActions />
					<RecentActivity userId={currentUser.id} />
				</>
			)}
		</div>
	);
}
