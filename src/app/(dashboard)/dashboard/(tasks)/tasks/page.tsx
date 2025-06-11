import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAllTasks } from "@/data/db/queries/get-all-tasks";
import { getCurrentUser } from "@/lib/auth";
import { Header } from "@/components/dashboard/tasks/header";
import { Tasks } from "@/components/dashboard/tasks/tasks";
import { Loader } from "lucide-react";

export default async function TasksPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const tasks = await getAllTasks(currentUser.id);

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<Suspense fallback={<Loading />}>
				<Tasks tasks={tasks} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="py-16 flex items-center justify-center">
			<div className="flex flex-col space-y-6">
				<div className="mx-auto flex items-center justify-center">
					<Loader className="size-16 shrink-0 text-muted-foreground animate-spin" />
				</div>
				<p className="text-muted-foreground text-sm">
					Loading current tasks...
				</p>
			</div>
		</div>
	);
}
