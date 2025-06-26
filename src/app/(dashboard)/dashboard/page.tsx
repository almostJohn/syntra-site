import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getUserTasksUpdate } from "@/data/queries/get-user-tasks-update";
import { getUserNotesUpdate } from "@/data/queries/get-user-notes-update";
import { getUserUpdate } from "@/data/queries/get-user-update";
import { Header } from "../_components/main/header";
import { Activities } from "../_components/main/activities";
import { QuickActions } from "../_components/main/quick-actions";
import { RecentActivity } from "../_components/main/recent-activity";

export default async function MainDashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const [taskActivities, noteActivities, userActivities] = await Promise.all([
		getUserTasksUpdate(user.id),
		getUserNotesUpdate(user.id),
		getUserUpdate(user.id),
	]);

	const userRecentActivity = [
		...taskActivities,
		...noteActivities,
		...userActivities,
	]
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.slice(0, 5);

	return (
		<>
			<Header />
			<Activities userId={user.id} />
			<QuickActions />
			<RecentActivity activities={userRecentActivity} />
		</>
	);
}
