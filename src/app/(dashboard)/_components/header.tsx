import { CreateProjectDialog } from "./create-project-dialog";

export function Header() {
	return (
		<div className="flex items-center justify-between w-full">
			<h2 className="text-2xl font-bold">Projects</h2>
			<div className="flex items-center justify-end">
				<CreateProjectDialog />
			</div>
		</div>
	);
}
