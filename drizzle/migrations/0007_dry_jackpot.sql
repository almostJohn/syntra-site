ALTER TABLE "notifications" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "subtitle" text;--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "message";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "name";