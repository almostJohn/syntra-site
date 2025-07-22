import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Breadcrumbs } from "@/components/private/breadcrumbs";
import { UpdateProjectName } from "@/components/private/update-project-name";
import { DeleteProject } from "@/components/private/delete-project";
import { toKebabCase } from "@/lib/to-kebab-case";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const project = await getProjectById(projectId);
	const name = project?.name ?? "unknown";
	const title = toKebabCase(name);

	return {
		title,
	};
}

export default async function ProjectIdSettingsPage({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;
	const user = await getCurrentUser();
	const project = await getProjectById(projectId);

	if (!user) {
		redirect("/login");
	}

	if (!project) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-4">
			<Breadcrumbs projectId={project.id} />
			<UpdateProjectName project={project} />
			<div className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700">
				<div className="flex flex-col gap-4 p-6">
					<div className="font-medium text-red-500">Danger Zone</div>
					<div className="text-sm max-w-xl">
						Permanently remove this project and all of it&apos;s contents from
						the Syntra platform. This action is <strong>irreversible</strong>,
						so please continue with caution.
					</div>
				</div>
				<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
					<div className="flex items-center justify-end">
						<DeleteProject projectId={project.id} />
					</div>
				</div>
			</div>
		</div>
	);
}
