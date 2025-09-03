export type Notification = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	status: "archived" | "read" | "unread";
	title: string;
	message: string;
};
