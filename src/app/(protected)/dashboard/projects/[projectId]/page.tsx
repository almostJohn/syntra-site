import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { projects as projectsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Kanban } from "@/components/dashboard/tasks/kanban";
import { CreateTaskForm } from "@/components/dashboard/forms/create-task-form";

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
		title: response?.project.name,
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
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-2xl font-semibold sm:text-xl">
					{response.project.name}
				</h1>
				<CreateTaskForm projectId={projectId} />
			</div>
			<Suspense fallback={<Loading />}>
				<Kanban userId={currentUser.id} projectId={projectId} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="flex items-center justify-center py-20">
			<Loader className="animate-spin text-neutral-500" />
		</div>
	);
}
