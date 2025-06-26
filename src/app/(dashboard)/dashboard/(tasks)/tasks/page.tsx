import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Header } from "@/app/(dashboard)/_components/tasks/header";
import { TaskBoard } from "@/app/(dashboard)/_components/tasks/task-board";

export default async function TasksPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<>
			<Header />
			<TaskBoard userId={user.id} />
		</>
	);
}
