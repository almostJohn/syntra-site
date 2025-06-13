import { CreateTeam } from "./create-team";

export function Header() {
	return (
		<div className="flex items-center justify-between">
			<h3 className="text-3xl font-bold">My Teams</h3>
			<div>
				<CreateTeam />
			</div>
		</div>
	);
}
