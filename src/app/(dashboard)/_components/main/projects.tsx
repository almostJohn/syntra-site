import { ProjectList } from "./project-list";
import { getAllProjects } from "@/data/queries/get-all-projects";
import { Icons } from "@/components/icons";

type ProjectsProps = {
	userId: string;
};

export async function Projects({ userId }: ProjectsProps) {
	const projects = await getAllProjects(userId);

	if (projects.length === 0) {
		return (
			<div className="mx-auto max-w-2xl flex flex-col space-y-2 items-center justify-center py-18 md:py-28">
				<div className="mx-auto flex justify-center">
					<Icons.sparkles className="size-16 shrink-0 text-neutral-500" />
				</div>
				<div className="flex flex-col space-y-1 text-center justify-center">
					<span className="font-medium">No Projects Found</span>
					<span className="text-sm text-neutral-500">
						Create a new project to get started.
					</span>
				</div>
			</div>
		);
	}

	return <ProjectList projects={projects} />;
}
