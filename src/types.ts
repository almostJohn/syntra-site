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
