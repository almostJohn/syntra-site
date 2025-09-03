export type Task = {
	name: string;
	description: string | null;
	status: "incomplete" | "in_progress" | "complete";
	priority: "critical" | "high" | "medium" | "low" | "backlog";
	category: "bug" | "feature" | "chore" | "docs" | "infra";
	projectId: string;
	userId: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
};
