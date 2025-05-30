import { redirect } from "next/navigation";
import { type AuthPayload, getSession } from "@/lib/auth";

export default async function DashboardPage() {
	const session = await getSession<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			<div className="p-8">
				<p className="font-bold">Dashboard Page</p>
			</div>
		</>
	);
}
