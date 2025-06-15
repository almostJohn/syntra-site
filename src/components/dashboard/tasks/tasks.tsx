import { TaskList } from "./task-list";
import { Icons } from "@/components/icons";

type Task = {
	id: string;
	title: string | null;
	subtitle: string | null;
	content: string;
	is_completed: boolean;
};

type TasksProps = {
	tasks: Task[];
};

export function Tasks({ tasks }: TasksProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<div className="py-16 flex items-center justify-center">
				<div className="flex flex-col space-y-6">
					<div className="mx-auto flex items-center justify-center">
						<Icons.sparkles className="size-16 shrink-0 text-muted-foreground" />
					</div>
					<p className="text-muted-foreground text-sm">
						No created tasks found. Create a new one to get started.
					</p>
				</div>
			</div>
		);
	}

	return <TaskList tasks={tasks} />;
}
