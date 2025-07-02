import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Activities } from "../_components/activities";
import { UserProfile } from "../_components/user-profile";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col space-y-6">
			<Activities userId={user.id} />
			<UserProfile user={user} />
		</div>
	);
}
