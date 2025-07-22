import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { CreateProject } from "@/components/private/create-project";
import { Projects } from "@/components/private/projects";
import { Icons } from "@/components/icons";

export default async function AppPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between w-full">
				<div className="text-lg font-bold leading-snug md:text-xl">
					Projects
				</div>
				<CreateProject />
			</div>
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
