import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskProgressBar } from "./task-progress-bar";
import { getAllTasks } from "@/data/db/queries/get-all-tasks";

type TaskBoardProps = {
	userId: string;
};

export async function TaskBoard({ userId }: TaskBoardProps) {
	const tasks = await getAllTasks(userId);

	const incompleteTasks = tasks.filter((task) => task.status === "INCOMPLETE");
	const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
	const completeTasks = tasks.filter((task) => task.status === "COMPLETE");

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
