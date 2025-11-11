export type CurrentUser = {
	id: string;
	username: string;
	displayName: string;
	avatar: string | null;
	createdAt: Date;
};

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
