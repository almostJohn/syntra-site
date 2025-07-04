import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { UserProfile } from "../_components/user-profile";
import { Header } from "../_components/header";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col space-y-6">
			<Header />
			<UserProfile user={user} />
		</div>
	);
}
