import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-8 bg-muted min-h-screen">
			<h1>Profile Page</h1>
		</div>
	);
}
