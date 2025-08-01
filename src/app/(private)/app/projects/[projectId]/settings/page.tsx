import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Breadcrumbs } from "@/components/private/projects/breadcrumbs";
import { ProjectSettings } from "@/components/private/projects/project-settings";
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
			<ProjectSettings project={project} />
		</div>
	);
}
