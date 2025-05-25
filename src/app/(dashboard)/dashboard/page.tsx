import { redirect } from "next/navigation";
import { type AuthPayload, getSession } from "@/lib/auth";

export default async function DashboardPage() {
	const session = await getSession<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			<h1 className="p-6">Dashboard Page</h1>
		</>
	);
}
