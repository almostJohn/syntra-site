import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CreateProjectModal } from "../_components/client/create-project-modal";

export default async function AppPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			{/* App Page Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="grid gap-1">
					<h1 className="text-lg font-semibold tracking-tight">Projects</h1>
					<p className="text-muted-foreground text-sm">
						Stay on top of your projects and manage them all in one place.
					</p>
				</div>
				<CreateProjectModal />
			</div>
		</div>
	);
}
