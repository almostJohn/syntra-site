export type User = {
	id: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Project = {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Task = {
	id: string;
	title: string;
	subtitle: string | null;
	content: string | null;
	status: "backlog" | "todo" | "in_progress" | "complete";
	priority: "critical" | "high" | "medium" | "low";
	category: "feature" | "bug" | "docs" | "refactor";
	projectId: string;
	userId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Notification = {
	id: string;
	content: string;
	status: "archived" | "unarchived" | "read" | "unread";
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};
