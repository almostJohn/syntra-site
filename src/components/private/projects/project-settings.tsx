import { UpdateProjectName } from "./update-project-name";
import { DeleteProject } from "./delete-project";

type Project = {
	id: string;
	name: string;
};

type ProjectSettingsProps = {
	project: Project;
};

export function ProjectSettings({ project }: ProjectSettingsProps) {
	return (
		<div className="flex flex-col gap-6">
			<UpdateProjectName project={project} />
			<DeleteProject project={project} />
		</div>
	);
}
