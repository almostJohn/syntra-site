export type TeamMember = {
	userId: string;
	teamId: string;
	role: "owner" | "admin" | "member";
	joinedAt: Date;
};
