import { TasksBoard } from "./tasks-board";
import { TasksColumn } from "./tasks-column";
import { TaskCard } from "./task-card";
import { getTasks } from "@/data/queries/get-tasks";
import { TasksProgress } from "./tasks-progress";
import { TasksProgressFallback } from "./tasks-progress-fallback";

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
				<TasksProgressFallback />
			) : (
				<TasksProgress
					incomplete={incompleteTasks.length}
					inProgress={inProgressTasks.length}
					complete={completeTasks.length}
				/>
			)}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
				<TasksBoard
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
					<TasksColumn>
						{incompleteTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TasksColumn>
				</TasksBoard>
				<TasksBoard
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
					<TasksColumn>
						{inProgressTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TasksColumn>
				</TasksBoard>
				<TasksBoard
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
					<TasksColumn>
						{completeTasks.map((task) => (
							<TaskCard key={task.id} task={task} projectId={projectId} />
						))}
					</TasksColumn>
				</TasksBoard>
			</div>
		</div>
	);
}
