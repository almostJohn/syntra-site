import { CreateTask } from "./create-task";

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
		<div className="flex items-center justify-between w-full">
			<h1 className="text-xl font-semibold leading-snug">{project.name}</h1>
			<CreateTask />
		</div>
	);
}
