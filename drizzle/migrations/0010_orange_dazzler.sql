CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"author" text DEFAULT 'anonymous' NOT NULL,
	"content" text NOT NULL,
	"color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "audit_log" CASCADE;--> statement-breakpoint
DROP TABLE "auth_challenges" CASCADE;--> statement-breakpoint
DROP TABLE "notifications" CASCADE;--> statement-breakpoint
DROP TABLE "projects" CASCADE;--> statement-breakpoint
DROP TABLE "tasks" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
DROP TYPE "public"."audit_log_event_enum";--> statement-breakpoint
DROP TYPE "public"."task_status";