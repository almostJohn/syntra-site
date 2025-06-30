import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskProgressBar } from "./task-progress-bar";
import { getAllTasks } from "@/data/queries/get-all-tasks";
import { Icons } from "@/components/icons";

type TaskBoardProps = {
	userId: string;
	projectId: string;
};

export async function TaskBoard({ userId, projectId }: TaskBoardProps) {
	const tasks = await getAllTasks(userId, projectId);

	const incompleteTasks = tasks.filter((task) => task.status === "INCOMPLETE");
	const inProgressTask = tasks.filter((task) => task.status === "IN_PROGRESS");
	const completeTasks = tasks.filter((task) => task.status === "COMPLETE");

	if (tasks.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex flex-col space-y-2 items-center justify-center py-18 md:py-28">
				<div className="mx-auto flex justify-center">
					<Icons.sparkles className="size-16 shrink-0 text-neutral-500" />
				</div>
				<div className="flex flex-col space-y-1 text-center justify-center">
					<p className="font-medium">No Tasks Found</p>
					<p className="text-sm text-neutral-500">
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
				inProgress={inProgressTask.length}
				complete={completeTasks.length}
			/>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
				<TaskColumn
					title="Incomplete"
					count={incompleteTasks.length}
					color="bg-red-500"
				>
					{incompleteTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
				<TaskColumn
					title="In Progress"
					count={inProgressTask.length}
					color="bg-amber-500"
				>
					{inProgressTask.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
				<TaskColumn
					title="Complete"
					count={completeTasks.length}
					color="bg-green-500"
				>
					{completeTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</TaskColumn>
			</div>
		</>
	);
}
