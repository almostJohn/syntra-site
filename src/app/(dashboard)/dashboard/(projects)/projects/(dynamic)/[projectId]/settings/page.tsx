import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Navigation } from "../../_components/navigation";
import { Header } from "./header";
import { ProjectNameSetting } from "./project-name-setting";
import { DangerZone } from "./danger-zone";

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
		<>
			<Navigation projectId={project.id} />
			<Header />
			<ProjectNameSetting project={project} />
			<DangerZone projectId={project.id} />
		</>
	);
}

function toKebabCase(text: string): string {
	return text
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
