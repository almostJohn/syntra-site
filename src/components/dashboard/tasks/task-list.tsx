import { Progress } from "@/components/ui/progress";
import { TaskItem } from "./task-item";

type Task = {
	id: string;
	title: string | null;
	subtitle: string | null;
	content: string;
	is_completed: boolean;
};

type TaskListProps = {
	tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
	const completedTasks = tasks.filter((task) => task.is_completed).length;
	const totalTasks = tasks.length;
	const progressPercentage =
		totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	return (
		<div className="flex flex-col gap-4 md:gap-8">
			{totalTasks > 0 && (
				<div className="bg-background rounded-xl p-6 shadow border border-border">
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-lg font-semibold text-neutral-900">Progress</h2>
						<span className="text-sm font-medium text-neutral-600">
							{completedTasks}/{totalTasks}{" "}
							{completedTasks <= 1 ? "task" : "tasks"} completed
						</span>
					</div>
					<Progress value={progressPercentage} className="h-3" />
					<p className="text-sm text-muted-foreground mt-2">
						{completedTasks === totalTasks && totalTasks > 0
							? "🎉 All tasks completed!"
							: `${totalTasks - completedTasks} ${totalTasks - completedTasks <= 1 ? "task" : "tasks"} remaining`}
					</p>
				</div>
			)}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
				{tasks.map((task, index) => (
					<TaskItem
						key={index}
						id={task.id}
						title={task.title}
						subtitle={task.subtitle}
						content={task.content}
						is_completed={task.is_completed}
					/>
				))}
			</div>
		</div>
	);
}
