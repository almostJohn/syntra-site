import { getProjects } from "@/data/get-project.data";
import { Icons } from "@/components/icons";
import {
	Empty,
	EmptyHeader,
	EmptyIconPlaceholder,
	EmptyContent,
} from "@/components/ui/empty";
import { ProjectList } from "./project-list";

export async function Projects({ userId }: { userId: string }) {
	const projects = await getProjects(userId);

	if (projects.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyIconPlaceholder>
						<Icons.sparkles className="size-14 shrink-0" />
					</EmptyIconPlaceholder>
				</EmptyHeader>
				<EmptyContent>
					No projects found. Create one to get started.
				</EmptyContent>
			</Empty>
		);
	}

	return <ProjectList projects={projects} />;
}
