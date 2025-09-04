import {
	pgEnum,
	pgTable,
	text,
	timestamp,
	primaryKey,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
	"incomplete",
	"in_progress",
	"complete",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
	"critical",
	"high",
	"medium",
	"low",
	"backlog",
]);

export const taskCategoryEnum = pgEnum("task_category", [
	"bug",
	"feature",
	"chore",
	"docs",
	"infra",
	"refactor",
	"testing",
	"design",
	"research",
	"spec",
	"marketing",
	"sales",
	"support",
	"ops",
	"finance",
	"planning",
	"meeting",
]);

export const notificationStatusEnum = pgEnum("notification_status", [
	"archived",
	"read",
	"unread",
]);

export const teamRoleEnum = pgEnum("team_role", ["owner", "admin", "member"]);

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
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

export const teams = pgTable("teams", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
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

export const teamMembers = pgTable(
	"team_members",
	{
		teamId: text("team_id")
			.references(() => teams.id, { onDelete: "cascade" })
			.notNull(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		role: teamRoleEnum("role").default("member").notNull(),
		joinedAt: timestamp("joined_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(t) => [primaryKey({ columns: [t.teamId, t.userId] })],
);

export const projects = pgTable("projects", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"), // description should be optional
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	teamId: text("team_id").references(() => teams.id, { onDelete: "cascade" }),
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
	description: text("description"), // description should be optional
	status: taskStatusEnum("status").default("incomplete").notNull(),
	priority: taskPriorityEnum("priority").notNull(),
	category: taskCategoryEnum("category").notNull(),
	projectId: text("project_id")
		.references(() => projects.id, { onDelete: "cascade" })
		.notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	assignedTo: text("assigned_to").references(() => users.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const notifications = pgTable("notifications", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	message: text("message").notNull(),
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
