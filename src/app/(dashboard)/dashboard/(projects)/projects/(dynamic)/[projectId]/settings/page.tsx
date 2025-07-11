import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Breadcrumbs } from "@/app/(dashboard)/_components/tasks/breadcrumbs";
import { UpdateProjectName } from "@/app/(dashboard)/_components/tasks/update-project-name";
import { DangerZone } from "@/app/(dashboard)/_components/tasks/danger-zone";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const project = await getProjectById(projectId);
	const rawName = project?.name ?? "untitled";
	const title = `${toKebabCase(rawName)}'s Settings`;

	return {
		title,
	};
}

export default async function ProjectSettingsPage({
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
			<DangerZone projectId={project.id} />
		</div>
	);
}

function toKebabCase(text: string): string {
	return text
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
