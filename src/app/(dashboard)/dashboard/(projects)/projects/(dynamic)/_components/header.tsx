import { CreateTaskDialog } from "./create-task-dialog";

type Project = {
	id: string;
	name: string;
	createdAt: Date;
	userId: string;
};

type HeaderProps = {
	project: Project;
};

export function Header({ project }: HeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-2xl font-bold">{project.name}</h2>
			<div className="flex items-center justify-end">
				<CreateTaskDialog />
			</div>
		</div>
	);
}
