import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserTeams } from "@/data/db/queries/get-user-teams";
import { getUserTasks } from "@/data/db/queries/get-user-tasks";
import { getUserUpdate } from "@/data/db/queries/get-user-update";
import { getUserTeamUpdate } from "@/data/db/queries/get-user-team-update";
import { getUserScheduleTasksUpdate } from "@/data/db/queries/get-user-schedule-tasks-update";
import { getUserRoleInTeam } from "@/data/db/queries/get-user-role-in-team";
import { Header } from "@/components/dashboard/main/header";
import { Activities } from "@/components/dashboard/main/activities";
import { RecentActivity } from "@/components/dashboard/main/recent-activity";

export default async function MainDashboardPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const teams = await getUserTeams(currentUser.id);

	const [taskActivities, userActivities, teamActivities] = await Promise.all([
		getUserTasks(currentUser.id),
		getUserUpdate(currentUser.id),
		getUserTeamUpdate(currentUser.id),
	]);

	const allScheduleActivities = await Promise.all(
		teams.map(async (team) => {
			const role = await getUserRoleInTeam(currentUser.id, team.id);

			if (!role) {
				return [];
			}

			return await getUserScheduleTasksUpdate(currentUser.id, role, team.id);
		}),
	);

	const userRecentActivity = [
		...taskActivities,
		...userActivities,
		...teamActivities,
		...allScheduleActivities.flat(),
	]
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.slice(0, 5);

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header userId={currentUser.id} />
			<Activities userId={currentUser.id} />
			<RecentActivity activities={userRecentActivity} />
		</div>
	);
}
