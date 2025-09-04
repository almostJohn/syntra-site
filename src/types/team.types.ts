export type Team = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	description: string | null;
	userId: string;
};

export type TeamOwner = {
	id: string;
	username: string;
	userTag: string;
	displayName: string;
};
