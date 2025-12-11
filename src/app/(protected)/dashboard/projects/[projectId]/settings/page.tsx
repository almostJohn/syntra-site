import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { projects as projectsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Breadcrumbs } from "@/components/dashboard/projects/breadcrumbs";
import { UpdateProjectNameForm } from "@/components/dashboard/forms/update-project-name-form";
import { DeleteProjectForm } from "@/components/dashboard/forms/delete-project-form";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
	const { projectId } = await params;
	const { data: response } = await request.get({
		fn: async () => {
			const [project] = await db
				.select({ id: projectsTable.id, name: projectsTable.name })
				.from(projectsTable)
				.where(eq(projectsTable.id, projectId))
				.limit(1);

			return { project };
		},
	});

	return {
		title: `${response?.project.name} (Settings)`,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = await params;
	const { data: currentUser } = await auth.getCurrentUser();
	const { data: response } = await request.get({
		fn: async () => {
			const [project] = await db
				.select()
				.from(projectsTable)
				.where(
					and(
						eq(projectsTable.id, projectId),
						eq(projectsTable.userId, currentUser!.id),
					),
				)
				.limit(1);

			return { project };
		},
	});

	if (!currentUser) {
		redirect("/login");
	}

	if (!response?.project) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-4">
			<Breadcrumbs projectId={projectId} />
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-semibold sm:text-xl">Settings</h1>
				<p className="text-base/6 text-neutral-500 sm:text-base/8">
					Manage your project information.
				</p>
			</div>
			<div className="mx-auto mt-3 flex w-full max-w-3xl flex-col gap-6">
				{/* Project Name Settings */}
				<UpdateProjectNameForm project={response.project} />
				{/* Project Danger Zone */}
				<DeleteProjectForm project={response.project} />
			</div>
		</div>
	);
}
