ALTER TABLE "tasks" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "description";