import * as React from "react";
import { request } from "@/lib/request";
import { ProjectList } from "./project-list";
import { db } from "@/db/sql";
import { desc, eq } from "drizzle-orm";
import { projects as projectsTable } from "@/db/schema";
import { Empty, EmptyHeading, EmptyText } from "@/components/ui/empty";

export async function Projects({ userId }: { userId: string }) {
	const { data: response } = await request.get({
		fn: async () => {
			const projects = await db
				.select()
				.from(projectsTable)
				.where(eq(projectsTable.userId, userId))
				.orderBy(desc(projectsTable.createdAt));

			return { projects };
		},
	});

	if (response?.projects.length === 0) {
		return (
			<Empty className="mt-24 border-none">
				<EmptyHeading>No Projects</EmptyHeading>
				<EmptyText>Create a new project to get started.</EmptyText>
			</Empty>
		);
	}

	return <ProjectList projects={response?.projects || []} />;
}
