import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Header } from "@/components/dashboard/main/header";
import { Activities } from "@/components/dashboard/main/activities";
import { QuickActions } from "@/components/dashboard/main/quick-actions";

export default async function MainDashboardPage() {
	const currentUser = await getCurrentUser();

	return (
		<div className="p-6 min-h-screen bg-muted flex flex-col space-y-6">
			{currentUser && (
				<>
					<Header name={currentUser.name} />
					<Activities userId={currentUser.id} />
					<QuickActions />
				</>
			)}
		</div>
	);
}
