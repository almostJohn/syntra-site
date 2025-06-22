import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { UserProfile } from "@/components/dashboard/profile/user-profile";
import { Activity } from "@/components/dashboard/profile/activity";

export default async function ProfilePage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="p-8 bg-muted min-h-screen">
			<div className="mx-auto max-w-3xl flex flex-col space-y-6">
				<Activity userId={currentUser.id} />
				<UserProfile user={currentUser} />
			</div>
		</div>
	);
}
