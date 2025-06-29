import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Header } from "./header";
import { Projects } from "./projects";

export default async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<>
			<Header />
			<Projects userId={user.id} />
		</>
	);
}
