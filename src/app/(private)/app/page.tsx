import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { Header as ProjectsHeader } from "@/components/private/projects/header";
import { Projects } from "@/components/private/projects/projects";
import { Icons } from "@/components/icons";

export default async function AppPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<ProjectsHeader title="Projects" />
			<Suspense fallback={<Loading />}>
				<Projects userId={user.id} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="mx-auto max-w-3xl flex items-center justify-center py-18 md:py-32">
			<Icons.loading className="size-6 shrink-0" />
		</div>
	);
}
