import { TaskList } from "./task-list";

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
	return <TaskList tasks={tasks} />;
}
