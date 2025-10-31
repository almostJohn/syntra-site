import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getProjectById } from "@/data/get-project.data";
import { H1 } from "@/components/ui/heading";

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

	const project = await getProjectById(projectId, user.id);

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

	const project = await getProjectById(projectId, user.id);

	if (!project) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-4">
			<H1>{project.name}</H1>
		</div>
	);
}
