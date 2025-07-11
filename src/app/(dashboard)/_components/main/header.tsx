import { CreateProject } from "./create-project";

export function Header() {
	return (
		<div className="flex items-center justify-between w-full">
			<h1 className="text-xl font-semibold leading-snug">Projects</h1>
			<CreateProject />
		</div>
	);
}
