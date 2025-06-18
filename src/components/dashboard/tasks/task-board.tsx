import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskProgressBar } from "./task-progress-bar";
import { getAllTasks } from "@/data/db/queries/get-all-tasks";
import { Icons } from "@/components/icons";

type TaskBoardProps = {
	userId: string;
};

export async function TaskBoard({ userId }: TaskBoardProps) {
	const tasks = await getAllTasks(userId);

	const incompleteTasks = tasks.filter((task) => task.status === "INCOMPLETE");
	const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
	const completeTasks = tasks.filter((task) => task.status === "COMPLETE");

	if (tasks.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex flex-col space-y-2 items-center justify-center py-16 md:py-28">
				<div className="mx-auto flex justify-center">
					<Icons.sparkles className="size-16 shrink-0 text-muted-foreground" />
				</div>
				<div className="flex flex-col space-y-1 justify-center text-center">
					<p className="font-medium">No Tasks Found</p>
					<p className="text-sm text-muted-foreground">
						Create a new task to get started.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<TaskProgressBar
				incomplete={incompleteTasks.length}
				inProgress={inProgressTasks.length}
				complete={completeTasks.length}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<TaskColumn
					title="Incomplete"
					count={incompleteTasks.length}
					color="bg-rose-500"
				>
					{incompleteTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
				<TaskColumn
					title="In Progress"
					count={inProgressTasks.length}
					color="bg-amber-500"
				>
					{inProgressTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
				<TaskColumn
					title="Complete"
					count={completeTasks.length}
					color="bg-emerald-500"
				>
					{completeTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
			</div>
		</>
	);
}
