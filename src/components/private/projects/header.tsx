import { CreateProject } from "./create-project";

export function Header({ title }: { title: string }) {
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
			<CreateProject />
		</div>
	);
}
