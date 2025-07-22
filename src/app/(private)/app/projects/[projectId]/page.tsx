import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/data/queries/get-project-by-id";
import { toKebabCase } from "@/lib/to-kebab-case";
import { CreateTask } from "@/components/private/create-task";
import { TaskBoard } from "@/components/private/task-board";
import { Icons } from "@/components/icons";
import { Breadcrumbs } from "@/components/private/breadcrumbs";

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
			<div className="flex items-center justify-between w-full">
				<div className="text-lg font-bold leading-snug md:text-xl">
					{toKebabCase(project.name)}
				</div>
				<CreateTask projectId={project.id} />
			</div>
			<Suspense fallback={<Loading />}>
				<TaskBoard userId={user.id} projectId={project.id} />
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
