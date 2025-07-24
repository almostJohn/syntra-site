import { TaskBoard } from "./task-board";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskProgress } from "./task-progress";
import { getTasks } from "@/data/queries/get-tasks";

type KanbanProps = {
	userId: string;
	projectId: string;
};

export async function Kanban({ userId, projectId }: KanbanProps) {
	const tasks = await getTasks(userId, projectId);

	const incompleteTasks = tasks.filter((task) => task.status === "INCOMPLETE");
	const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
	const completeTasks = tasks.filter((task) => task.status === "COMPLETE");

	return (
		<div className="flex flex-col gap-6">
			{tasks.length === 0 ? (
				<TaskProgressFallback />
			) : (
				<TaskProgress
					incomplete={incompleteTasks.length}
					inProgress={inProgressTasks.length}
					complete={completeTasks.length}
				/>
			)}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
				<TaskBoard
					title="Incomplete"
					color="bg-red-500"
					taskLength={incompleteTasks.length}
					projectId={projectId}
					status="INCOMPLETE"
				>
					{incompleteTasks.length === 0 && (
						<div className="flex flex-col gap-2 items-center px-4 py-12">
							<div className="text-sm font-medium">No Tasks Found</div>
							<div className="text-xs text-neutral-500">
								Move tasks here to update their status.
							</div>
						</div>
					)}
					<TaskColumn>
						{incompleteTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TaskColumn>
				</TaskBoard>
				<TaskBoard
					title="In Progress"
					color="bg-orange-500"
					taskLength={inProgressTasks.length}
					projectId={projectId}
					status="IN_PROGRESS"
				>
					{inProgressTasks.length === 0 && (
						<div className="flex flex-col gap-2 items-center px-4 py-12">
							<div className="text-sm font-medium">No Tasks Found</div>
							<div className="text-xs text-neutral-500">
								Move tasks here to update their status.
							</div>
						</div>
					)}
					<TaskColumn>
						{inProgressTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TaskColumn>
				</TaskBoard>
				<TaskBoard
					title="Complete"
					color="bg-green-500"
					taskLength={completeTasks.length}
					projectId={projectId}
					status="COMPLETE"
				>
					{completeTasks.length === 0 && (
						<div className="flex flex-col gap-2 items-center px-4 py-12">
							<div className="text-sm font-medium">No Tasks Found</div>
							<div className="text-xs text-neutral-500">
								Move tasks here to update their status.
							</div>
						</div>
					)}
					<TaskColumn>
						{completeTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TaskColumn>
				</TaskBoard>
			</div>
		</div>
	);
}

function TaskProgressFallback() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium">Overall Progress</h3>
				<span className="text-sm text-neutral-500">No tasks yet</span>
			</div>
			<div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden flex">
				<div className="rounded-full h-full w-full bg-neutral-500 text-neutral-800 dark:text-neutral-100 inline-flex items-center justify-center text-center text-sm font-medium" />
			</div>
			<div className="flex justify-between text-xs text-neutral-500">
				<div className="flex flex-wrap gap-2">
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-red-500" />
						<span>Incomplete (0)</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-orange-500" />
						<span>In Progress (0)</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-green-500" />
						<span>Complete (0)</span>
					</div>
				</div>
				<div className="font-medium flex justify-end text-right">
					{0}% Completed
				</div>
			</div>
		</div>
	);
}
