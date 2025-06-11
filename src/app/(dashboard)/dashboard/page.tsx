import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserTeams } from "@/data/db/queries/get-user-teams";
import { getUserRecentActivity } from "@/data/db/queries/get-user-recent-activity";
import { getUserRoleInTeam } from "@/data/db/queries/get-user-role-in-team";
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
	const teams = await getUserTeams(currentUser.id);

	if (teams.length > 0) {
		const teamId = teams[0].id;
		const userRole = await getUserRoleInTeam(currentUser.id, teamId);

		if (!userRole) {
			notFound();
		}

		userRecentActivity = await getUserRecentActivity(currentUser.id, userRole);
	} else {
		userRecentActivity = await getUserRecentActivity(currentUser.id, "MEMBER");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header userId={currentUser.id} />
			<Activities userId={currentUser.id} />
			<QuickActions />
			<RecentActivity activities={userRecentActivity} />
		</div>
	);
}
