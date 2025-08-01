import { ProjectList } from "./project-list";
import { getProjects } from "@/data/queries/get-projects";
import { Icons } from "@/components/icons";

type ProjectsProps = {
	userId: string;
};

export async function Projects({ userId }: ProjectsProps) {
	const projects = await getProjects(userId);

	if (projects.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex flex-col gap-2 items-center justify-center py-16 md:py-24">
				<div className="mx-auto flex justify-center">
					<Icons.sparkles className="size-12 shrink-0 text-neutral-500" />
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
