import { redirect } from "next/navigation";
import { getAllTasks } from "@/data/db/queries/getAllTasks";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Header } from "@/components/dashboard/tasks/header";
import { Tasks } from "@/components/dashboard/tasks/tasks";

export default async function TasksPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const tasks = await getAllTasks(currentUser.id);

	return (
		<div className="p-6 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<Tasks tasks={tasks} />
		</div>
	);
}
