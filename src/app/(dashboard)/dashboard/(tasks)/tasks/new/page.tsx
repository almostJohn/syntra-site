import { CreateTaskForm } from "@/components/dashboard/tasks/create-task-form";

export default function CreateTaskPage() {
	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<CreateTaskForm />
		</div>
	);
}
