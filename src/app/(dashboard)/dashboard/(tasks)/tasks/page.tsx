import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Header } from "@/components/dashboard/tasks/header";

export default async function TasksPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
		</div>
	);
}
