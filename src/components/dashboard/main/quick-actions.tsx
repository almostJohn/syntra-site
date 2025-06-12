import { CreateTaskQuickAction } from "./create-task-quick-action";
import { CreateTeamQuickAction } from "./create-team-quick-action";

export function QuickActions() {
	return (
		<div className="block p-6 bg-background border border-border shadow rounded-xl">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Quick Actions</h3>
				<div className="grid grid-cols-2 gap-6 w-full">
					<CreateTaskQuickAction />
					<CreateTeamQuickAction />
				</div>
			</div>
		</div>
	);
}
