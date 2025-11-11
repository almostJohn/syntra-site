import {
	pgEnum,
	pgTable,
	text,
	timestamp,
	integer,
	boolean,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
	"todo",
	"in_progress",
	"done",
]);

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	username: text("username").unique().notNull(),
	password: text("password").notNull(),
	displayName: text("display_name"),
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
	userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const tasks = pgTable("tasks", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: taskStatusEnum("status").default("todo").notNull(),
	projectId: text("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
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

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey().notNull(),
	description: text("description").notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
