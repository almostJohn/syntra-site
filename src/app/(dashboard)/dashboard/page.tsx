import { redirect } from "next/navigation";
import type { AuthPayload } from "@/auth/types";
import { getSessionUser } from "@/auth/get-session-user";

export default async function DashboardPage() {
	const session = await getSessionUser<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			<h1 className="p-6">Dashboard Page</h1>
		</>
	);
}
