import { pgEnum, pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
	"backlog",
	"todo",
	"in_progress",
	"complete",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
	"critical",
	"high",
	"medium",
	"low",
]);

export const taskCategoryEnum = pgEnum("task_category", [
	"feature",
	"bug",
	"docs",
	"refactor",
]);

export const notificationStatusEnum = pgEnum("notification_status", [
	"archived",
	"read",
	"unread",
]);

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	username: text("username").unique().notNull(),
	password: text("password").notNull(),
	avatar: text("avatar"),
	avatarSize: integer("avatar_size"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const projects = pgTable("projects", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const tasks = pgTable("tasks", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	subtitle: text("subtitle"),
	content: text("content"),
	status: taskStatusEnum("status").default("todo").notNull(),
	priority: taskPriorityEnum("priority").notNull(),
	category: taskCategoryEnum("category").notNull(),
	projectId: text("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
	userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey().notNull(),
	content: text("content").notNull(),
	status: notificationStatusEnum("status").default("unread").notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
