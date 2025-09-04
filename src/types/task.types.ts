export type Task = {
	name: string;
	description: string | null;
	status: "incomplete" | "in_progress" | "complete";
	priority: "critical" | "high" | "medium" | "low" | "backlog";
	category:
		| "bug"
		| "feature"
		| "chore"
		| "docs"
		| "infra"
		| "refactor"
		| "testing"
		| "design"
		| "research"
		| "spec"
		| "marketing"
		| "sales"
		| "support"
		| "ops"
		| "finance"
		| "planning"
		| "meeting";
	projectId: string;
	userId: string;
	assignedTo: string | null;
	id: string;
	createdAt: Date;
	updatedAt: Date;
};
