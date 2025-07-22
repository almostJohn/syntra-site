CREATE TYPE "public"."task_status" AS ENUM('INCOMPLETE', 'IN_PROGRESS', 'COMPLETE');--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DATA TYPE "public"."task_status" USING "status"::text::"public"."task_status";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'INCOMPLETE';--> statement-breakpoint
DROP TYPE "public"."Status";