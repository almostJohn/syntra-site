import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Header } from "../_components/header";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const project = await getProjectById(projectId);
	const rawName = project?.name ?? "Untitled";
	const title = toKebabCase(rawName);

	return {
		title,
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;

	const user = await getCurrentUser();

	const project = await getProjectById(projectId);

	if (!project) {
		notFound();
	}

	if (!user) {
		redirect("/login");
	}

	return (
		<>
			<Header project={project} />
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
