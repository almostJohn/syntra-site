import { TaskBoard } from "./task-board";
import { TaskColumn } from "./task-column";
import { TaskItem } from "./task-item";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { eq, and, desc } from "drizzle-orm";
import { tasks as tasksTable } from "@/db/schema";
import { Empty, EmptyHeading, EmptyText } from "@/components/ui/empty";
import { TaskProgressBar } from "./task-progress-bar";

type KanbanProps = {
	userId: string;
	projectId: string;
};

export async function Kanban({ userId, projectId }: KanbanProps) {
	const { data: response } = await request.get({
		fn: async () => {
			const tasks = await db
				.select()
				.from(tasksTable)
				.where(
					and(
						eq(tasksTable.projectId, projectId),
						eq(tasksTable.userId, userId),
					),
				)
				.orderBy(desc(tasksTable.createdAt));

			return { tasks };
		},
	});

	if (response?.tasks && response.tasks.length === 0) {
		return (
			<Empty>
				<EmptyHeading>No Tasks Yet</EmptyHeading>
				<EmptyText>Create one to get started.</EmptyText>
			</Empty>
		);
	}

	const todoTasks = response?.tasks.filter((task) => task.status === "todo");
	const inProgressTasks = response?.tasks.filter(
		(task) => task.status === "in_progress",
	);
	const doneTasks = response?.tasks.filter((task) => task.status === "done");

	return (
		<div className="flex flex-col gap-6">
			{/* Task Progress Bar */}
			{todoTasks && inProgressTasks && doneTasks && (
				<TaskProgressBar
					todo={todoTasks.length}
					inProgress={inProgressTasks.length}
					done={doneTasks.length}
				/>
			)}
			{/* Pro tip */}
			<p className="text-sm">
				<strong className="text-teal-700">Pro tip:</strong> Updating a
				task&apos;s status will automatically move it to the correct column.
			</p>
			{/* Boards */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<TaskBoard
					title="Todo"
					color="bg-blue-500"
					taskLength={todoTasks!.length}
				>
					{todoTasks && todoTasks.length === 0 ? (
						<Empty className="border-none">
							<EmptyHeading>No Tasks Found</EmptyHeading>
							<EmptyText>Move tasks here to update their status.</EmptyText>
						</Empty>
					) : (
						<TaskColumn>
							{todoTasks?.map((task) => (
								<TaskItem key={task.id} projectId={projectId} task={task} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
				<TaskBoard
					title="In Progress"
					color="bg-orange-500"
					taskLength={inProgressTasks!.length}
				>
					{inProgressTasks && inProgressTasks.length === 0 ? (
						<Empty className="border-none">
							<EmptyHeading>No Tasks Found</EmptyHeading>
							<EmptyText>Move tasks here to update their status.</EmptyText>
						</Empty>
					) : (
						<TaskColumn>
							{inProgressTasks?.map((task) => (
								<TaskItem key={task.id} projectId={projectId} task={task} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
				<TaskBoard
					title="Done"
					color="bg-green-500"
					taskLength={doneTasks!.length}
				>
					{doneTasks && doneTasks.length === 0 ? (
						<Empty className="border-none">
							<EmptyHeading>No Tasks Found</EmptyHeading>
							<EmptyText>Move tasks here to update their status.</EmptyText>
						</Empty>
					) : (
						<TaskColumn>
							{doneTasks?.map((task) => (
								<TaskItem key={task.id} projectId={projectId} task={task} />
							))}
						</TaskColumn>
					)}
				</TaskBoard>
			</div>
		</div>
	);
}
