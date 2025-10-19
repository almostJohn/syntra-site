import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { DataQuery } from "@/lib/data";
import { TypographicalComponents } from "@/components/typographical-components";
import { Kanban } from "@/app/(_protected)/_components/kanban";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const project = await DataQuery.getProjectById(projectId, user.id);

	return {
		title: project?.name ?? "untitled",
	};
}

export default async function ProjectIdPage({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const project = await DataQuery.getProjectById(projectId, user.id);

	if (!project) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-4">
			<TypographicalComponents.h1>{project.name}</TypographicalComponents.h1>
			<Kanban userId={user.id} projectId={project.id} />
		</div>
	);
}
