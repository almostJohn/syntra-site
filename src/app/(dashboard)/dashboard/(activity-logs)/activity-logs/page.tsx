import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getRecentActivities } from "@/data/queries/get-recent-activities";
import { Header } from "@/app/(dashboard)/_components/activity-logs/header";
import { Logs } from "@/app/(dashboard)/_components/activity-logs/logs";
import { Icons } from "@/components/icons";

export default async function ActivityLogsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const activities = await getRecentActivities(user.id, 10);

	return (
		<div className="flex flex-col gap-4">
			<Header />
			<Suspense fallback={<Loading />}>
				{activities.length === 0 ? (
					<div className="mx-auto flex justify-center text-center py-18 md:py-28">
						<p className="font-medium">No Logs Found.</p>
					</div>
				) : (
					<Logs activities={activities} />
				)}
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="mx-auto max-w-3xl flex flex-col space-y-4 items-center justify-center py-18 md:py-28">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-16 shrink-0" />
			</div>
			<p className="font-medium">Retrieving Logs...</p>
		</div>
	);
}
