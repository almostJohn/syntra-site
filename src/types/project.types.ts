export type Project = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	description: string | null;
	userId: string;
	teamId: string | null;
};
