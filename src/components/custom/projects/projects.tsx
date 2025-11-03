import { getProjects } from "@/data/get-project.data";
import { Icons } from "@/components/icons";
import {
	Empty,
	EmptyHeader,
	EmptyHeading,
	EmptyContent,
} from "@/components/ui/empty";
import { ProjectList } from "./project-list";

export async function Projects({ userId }: { userId: string }) {
	const projects = await getProjects(userId);

	if (projects.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<Icons.sparkles className="size-14 shrink-0" />
				</EmptyHeader>
				<div className="grid gap-1">
					<EmptyHeading>No Projects Found</EmptyHeading>
					<EmptyContent>Create one to get started.</EmptyContent>
				</div>
			</Empty>
		);
	}

	return <ProjectList projects={projects} />;
}
