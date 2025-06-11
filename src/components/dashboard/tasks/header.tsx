import { CreateTask } from "./create-task";

export function Header() {
	return (
		<div className="flex justify-between items-center">
			<h3 className="text-3xl font-bold">My Tasks</h3>
			<div>
				<CreateTask />
			</div>
		</div>
	);
}
