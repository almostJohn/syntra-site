import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CreateProjectForm } from "../_components/client/create-project.form";
import { TypographicalComponents } from "@/components/typographical-components";

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
		</div>
	);
}
