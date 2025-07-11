import {
	pgEnum,
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("Status", [
	"INCOMPLETE",
	"IN_PROGRESS",
	"COMPLETE",
]);

export const notificationTypeEnum = pgEnum("NotificationType", [
	"CREATE_TASK",
	"UPDATE_TASK",
	"DELETE_TASK",
	"CREATE_PROJECT",
	"UPDATE_PROJECT",
	"DELETE_PROJECT",
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

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	question: text("question").notNull(),
	hashedAnswer: text("hashed_answer").notNull(),
	failedAttempts: integer("failed_attempts").notNull().default(0),
	lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	lockedUntil: timestamp("locked_until", { withTimezone: true })
		.defaultNow()
		.notNull(),
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
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedat: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const tasks = pgTable("tasks", {
	id: text("id").primaryKey(),
	content: text("content").notNull(),
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
	projectId: text("project_id")
		.notNull()
		.references(() => projects.id, { onDelete: "cascade" }),
});

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	projectId: text("project_id").references(() => projects.id, {
		onDelete: "cascade",
	}),
	taskId: text("task_id").references(() => tasks.id, { onDelete: "cascade" }),
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
