import { pgTable, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
	"INCOMPLETE",
	"IN_PROGRESS",
	"COMPLETE",
]);

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	username: text("username").unique().notNull(),
	userTag: text("user_tag").notNull(),
	displayName: text("display_name").notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const projects = pgTable("projects", {
	id: text("id").primaryKey(),
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
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	status: taskStatusEnum("status").default("INCOMPLETE").notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	projectId: text("project_id").references(() => projects.id, {
		onDelete: "cascade",
	}),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const auditLogs = pgTable("audit_logs", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey(),
	description: text("description").notNull(),
	isArchived: boolean("is_archived").default(false).notNull(),
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
