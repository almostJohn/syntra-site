import { CreateNoteDialog } from "./create-note-dialog";
import { CreateTaskDialog } from "./create-task-dialog";

export function QuickActions() {
	return (
		<div className="p-6 bg-muted/40 border border-border rounded-md shadow-md">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Quick Actions</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
					<CreateTaskDialog />
					<CreateNoteDialog />
				</div>
			</div>
		</div>
	);
}
