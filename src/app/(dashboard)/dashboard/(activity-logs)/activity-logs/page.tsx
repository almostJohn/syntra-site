import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getRecentActivities } from "@/data/queries/get-recent-activities";
import { Header } from "../_components/header";
import { ActivityLogs } from "../_components/activity-logs";

export default async function ActivityLogsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const activities = await getRecentActivities(user.id, 10);

	if (activities.length === 0) {
		return (
			<div className="mx-auto flex justify-center text-center py-18 md:py-28">
				<p className="font-medium">No Logs Found.</p>
			</div>
		);
	}

	return (
		<>
			<Header />
			<ActivityLogs activities={activities} />
		</>
	);
}
