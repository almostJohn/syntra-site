import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function NotificationsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Notifications Page Header */}
			<div className="flex items-center">
				<div className="grid gap-1">
					<h1 className="text-lg font-semibold tracking-tight">
						Notifications
					</h1>
					<p className="text-muted-foreground text-sm">
						Stay informed with real-time updates and important notifications.
					</p>
				</div>
			</div>
		</div>
	);
}
