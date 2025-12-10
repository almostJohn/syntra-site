export type User = {
	id: string;
	username: string;
	password: string;
	displayName: string | null;
	avatar: string | null;
	avatarSize: number | null;
	createdAt: Date;
	updatedAt: Date;
};

export type CurrentUser = Omit<User, "password" | "avatarSize" | "updatedAt">;

export type AuthPayload = {
	userId: string;
	username: string;
};

export enum MessageType {
	Error = 1,
	Success,
}

export type ActionState = {
	message: string | undefined;
	type: MessageType;
};

export type Project = {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TaskStatus = "todo" | "in_progress" | "done";
export type Task = {
	id: string;
	name: string;
	description: string | null;
	status: TaskStatus;
	projectId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Notification = {
	id: string;
	description: string;
	isRead: boolean;
	userId: string;
	createdAt: Date;
};

export type Author = Pick<User, "id" | "username" | "displayName">;

export type ProjectWithAuthor = Project & {
	author: Author;
};

export type TaskWithAuthor = Task & {
	author: Author;
};

export type NotificationWithAuthor = Notification & {
	author: Author;
};
