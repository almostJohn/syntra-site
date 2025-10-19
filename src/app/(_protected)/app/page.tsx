import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { CreateProjectForm } from "../_components/client/create-project.form";
import { TypographicalComponents } from "@/components/typographical-components";
import { Projects } from "../_components/projects";
import { Loader2 } from "lucide-react";

export default async function AppPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="grid gap-1">
					<TypographicalComponents.h1>Projects</TypographicalComponents.h1>
					<TypographicalComponents.p>
						Stay on top of your projects and manage them all in one place.
					</TypographicalComponents.p>
				</div>
				<CreateProjectForm />
			</div>
			<Suspense fallback={<Loading />}>
				<Projects user={user} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-4 py-24 text-center">
			<div className="mx-auto flex justify-center">
				<Loader2 className="size-12 shrink-0 animate-spin" />
			</div>
			<p className="text-center text-sm text-neutral-500">
				Loading projects...
			</p>
		</div>
	);
}
