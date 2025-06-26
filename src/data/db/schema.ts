import { pgEnum, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export enum TaskStatus {
	Incomplete = "INCOMPLETE",
	InProgress = "IN_PROGRESS",
	Complete = "COMPLETE",
}

export enum NotificationType {
	CreateTask = "CREATE_TASK",
	UpdateTask = "UPDATE_TASK",
	DeleteTask = "DELETE_TASK",
	CreateNote = "CREATE_NOTE",
	UpdateNote = "UPDATE_NOTE",
	DeleteNote = "DELETE_NOTE",
	CreateUser = "CREATE_USER",
	UpdateUser = "UPDATE_USER",
	DeleteUser = "DELETE_USER",
	Alert = "ALERT",
	Info = "INFO",
	Reminder = "REMINDER",
}

export const statusEnum = pgEnum("Status", [
	"INCOMPLETE",
	"IN_PROGRESS",
	"COMPLETE",
]);

export const notificationTypeEnum = pgEnum("NotificationType", [
	"CREATE_TASK",
	"UPDATE_TASK",
	"DELETE_TASK",
	"CREATE_NOTE",
	"UPDATE_NOTE",
	"DELETE_NOTE",
	"CREATE_USER",
	"UPDATE_USER",
	"DELETE_USER",
	"ALERT",
	"INFO",
	"REMINDER",
]);

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	displayName: text("display_name").notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const tasks = pgTable("tasks", {
	id: text("id").primaryKey(),
	title: text("title"),
	description: text("description").notNull(),
	status: statusEnum("status").default("INCOMPLETE").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const notes = pgTable("notes", {
	id: text("id").primaryKey(),
	title: text("title"),
	description: text("description").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	taskId: text("task_id").references(() => tasks.id, { onDelete: "cascade" }),
	noteId: text("note_id").references(() => notes.id, { onDelete: "cascade" }),
	description: text("description").notNull(),
	isArchived: boolean("is_archived").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	type: notificationTypeEnum("type").notNull(),
});
