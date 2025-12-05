import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Projects } from "@/components/dashboard/projects/projects";
import { Loader } from "lucide-react";
import { CreateProjectForm } from "@/components/dashboard/forms/create-project-form";

export default async function Page() {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) redirect("/login");

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold sm:text-xl">Projects</h1>
					<p className="text-base/6 text-neutral-500 sm:text-base/8">
						Stay on top of your projects and manage them all in one place.
					</p>
				</div>
				<CreateProjectForm />
			</div>
			<Suspense fallback={<Loading />}>
				<Projects userId={currentUser.id} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="flex items-center justify-center py-20">
			<Loader className="animate-spin text-neutral-500" />
		</div>
	);
}
