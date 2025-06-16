import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserTasksUpdate } from "@/data/db/queries/get-user-tasks-update";
import { getUserNotesUpdate } from "@/data/db/queries/get-user-notes-update";
import { getUserUpdate } from "@/data/db/queries/get-user-update";
import { Header } from "@/components/dashboard/main/header";
import { QuickActions } from "@/components/dashboard/main/quick-actions";
import { Activities } from "@/components/dashboard/main/activities";
import { RecentActivity } from "@/components/dashboard/main/recent-activity";

export default async function MainDashboardPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const [taskActivities, noteActivities, userActivities] = await Promise.all([
		getUserTasksUpdate(currentUser.id),
		getUserNotesUpdate(currentUser.id),
		getUserUpdate(currentUser.id),
	]);

	const userRecentActivity = [
		...taskActivities,
		...noteActivities,
		...userActivities,
	]
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.slice(0, 5);

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header userId={currentUser.id} />
			<Activities userId={currentUser.id} />
			<QuickActions />
			<RecentActivity activities={userRecentActivity} />
		</div>
	);
}
