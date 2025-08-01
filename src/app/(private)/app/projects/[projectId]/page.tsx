import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { toKebabCase } from "@/lib/to-kebab-case";
import { Icons } from "@/components/icons";
import { Breadcrumbs } from "@/components/private/projects/breadcrumbs";
import { Header as TasksHeader } from "@/components/private/tasks/header";
import { Kanban } from "@/components/private/tasks/kanban";

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

export default async function ProjectIdPage({
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
			<TasksHeader title={toKebabCase(project.name)} />
			<Suspense fallback={<Loading />}>
				<Kanban userId={user.id} projectId={project.id} />
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
