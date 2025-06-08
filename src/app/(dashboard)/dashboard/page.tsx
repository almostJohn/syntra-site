import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getUserRecentActivity } from "@/data/db/queries/getUserRecentActivity";
import { getUserRoleInTeam } from "@/data/db/queries/getUserRoleInTeam";
import { Header } from "@/components/dashboard/main/header";
import { Activities } from "@/components/dashboard/main/activities";
import { QuickActions } from "@/components/dashboard/main/quick-actions";
import { RecentActivity } from "@/components/dashboard/main/recent-activity";

export default async function MainDashboardPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	let userRecentActivity = [];

	if (currentUser.teams.length > 0) {
		const teamId = currentUser.teams[0].id;
		const userRole = await getUserRoleInTeam(currentUser.id, teamId);

		if (!userRole) {
			notFound();
		}

		userRecentActivity = await getUserRecentActivity(currentUser.id, userRole);
	} else {
		userRecentActivity = await getUserRecentActivity(currentUser.id, "MEMBER");
	}

	return (
		<div className="p-6 min-h-screen bg-muted flex flex-col space-y-6">
			<Header name={currentUser.name} />
			<Activities userId={currentUser.id} />
			<QuickActions />
			<RecentActivity activities={userRecentActivity} />
		</div>
	);
}
