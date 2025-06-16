import { CreateTaskClient } from "./create-task-client";
import { CreateNoteClient } from "./create-note-client";

export function QuickActions() {
	return (
		<div className="block p-6 bg-background border border-border rounded-xl shadow">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Quick Actions</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
					<CreateTaskClient />
					<CreateNoteClient />
				</div>
			</div>
		</div>
	);
}
