import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { H1 } from "@/components/ui/heading";
import { P } from "@/components/ui/paragraph";
import { Projects } from "@/components/custom/projects/projects";
import { Icons } from "@/components/icons";
import { CreateProjectModal } from "@/components/custom/modals/create-project-modal";

export default async function AppPage() {
	const currentUser = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="grid gap-1">
					<H1>Projects</H1>
					<P>Stay on top of your projects and manage them all in one place.</P>
				</div>
				<CreateProjectModal />
			</div>
			<Suspense fallback={<Loading />}>
				<Projects userId={currentUser.id} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-2 py-24 md:py-32 lg:py-40">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-18 shrink-0 text-neutral-500" />
			</div>
			<p className="text-neutral-500">Loading projects...</p>
		</div>
	);
}
