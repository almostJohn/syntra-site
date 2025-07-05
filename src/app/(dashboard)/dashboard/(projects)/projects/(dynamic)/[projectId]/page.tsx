import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { Header } from "../_components/header";
import { TaskBoard } from "../_components/task-board";
import { Navigation } from "../_components/navigation";
import { Icons } from "@/components/icons";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const project = await getProjectById(projectId);
	const rawName = project?.name ?? "untitled";
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
			<Navigation projectId={project.id} />
			<Header project={project} />
			<Suspense fallback={<Loading />}>
				<TaskBoard userId={user.id} projectId={project.id} />
			</Suspense>
		</>
	);
}

function Loading() {
	return (
		<div className="mx-auto max-w-3xl flex flex-col space-y-4 items-center justify-center py-18 md:py-28">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-16 shrink-0" />
			</div>
			<p className="font-medium">Loading Tasks...</p>
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
