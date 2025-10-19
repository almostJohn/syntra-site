import { DataQuery } from "@/lib/data";
import { TaskBoard } from "./task-board";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { TaskProgress } from "./task-progress";
import {
	Empty,
	EmptyContent,
	EmptyHeaderIconPlaceholder,
	EmptyHeader,
} from "@/components/ui/empty";
import { Icons } from "@/components/icons";

type KanbanProps = {
	userId: string;
	projectId: string;
};

export async function Kanban({ userId, projectId }: KanbanProps) {
	const tasks = await DataQuery.getAllTasks(projectId, userId);

	const backlogTasks = tasks.filter((t) => t.status === "backlog");
	const todoTasks = tasks.filter((t) => t.status === "todo");
	const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
	const completeTasks = tasks.filter((t) => t.status === "complete");

	return (
		<div className="flex flex-col gap-6">
			{tasks.length > 0 && (
				<TaskProgress
					backlog={backlogTasks.length}
					todo={todoTasks.length}
					inProgress={inProgressTasks.length}
					complete={completeTasks.length}
				/>
			)}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<TaskBoard
					title="Backlog"
					color="bg-blue-500"
					tasksLength={backlogTasks.length}
					projectId={projectId}
					status="backlog"
				>
					{backlogTasks.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyHeaderIconPlaceholder>
									<Icons.sparkles className="size-6 shrink-0" />
								</EmptyHeaderIconPlaceholder>
							</EmptyHeader>
							<EmptyContent>
								No tasks found. Create one to get started.
							</EmptyContent>
						</Empty>
					) : (
						<TaskColumn>
							{backlogTasks.map((task) => (
								<TaskCard key={task.id} task={task} projectId={projectId} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
				<TaskBoard
					title="Todo"
					color="bg-purple-500"
					tasksLength={todoTasks.length}
					projectId={projectId}
					status="todo"
				>
					{todoTasks.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyHeaderIconPlaceholder>
									<Icons.sparkles className="size-6 shrink-0" />
								</EmptyHeaderIconPlaceholder>
							</EmptyHeader>
							<EmptyContent>
								No tasks found. Create one to get started.
							</EmptyContent>
						</Empty>
					) : (
						<TaskColumn>
							{todoTasks.map((task) => (
								<TaskCard key={task.id} task={task} projectId={projectId} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
				<TaskBoard
					title="In Progress"
					color="bg-orange-500"
					tasksLength={inProgressTasks.length}
					projectId={projectId}
					status="in_progress"
				>
					{inProgressTasks.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyHeaderIconPlaceholder>
									<Icons.sparkles className="size-6 shrink-0" />
								</EmptyHeaderIconPlaceholder>
							</EmptyHeader>
							<EmptyContent>
								No tasks found. Create one to get started.
							</EmptyContent>
						</Empty>
					) : (
						<TaskColumn>
							{inProgressTasks.map((task) => (
								<TaskCard key={task.id} task={task} projectId={projectId} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
				<TaskBoard
					title="Complete"
					color="bg-green-500"
					tasksLength={completeTasks.length}
					projectId={projectId}
					status="complete"
				>
					{completeTasks.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyHeaderIconPlaceholder>
									<Icons.sparkles className="size-6 shrink-0" />
								</EmptyHeaderIconPlaceholder>
							</EmptyHeader>
							<EmptyContent>
								No tasks found. Create one to get started.
							</EmptyContent>
						</Empty>
					) : (
						<TaskColumn>
							{completeTasks.map((task) => (
								<TaskCard key={task.id} task={task} projectId={projectId} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
			</div>
		</div>
	);
}
