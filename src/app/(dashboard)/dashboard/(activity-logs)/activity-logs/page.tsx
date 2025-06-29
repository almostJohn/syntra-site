import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";

export default async function ActivityLogsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen">
			<h1>Activity Logs Page</h1>
		</div>
	);
}
