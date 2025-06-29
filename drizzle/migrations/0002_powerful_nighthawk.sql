ALTER TABLE "notifications" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."NotificationType";--> statement-breakpoint
CREATE TYPE "public"."NotificationType" AS ENUM('CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'CREATE_PROJECT', 'UPDATE_PROJECT', 'DELETE_PROJECT');--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "type" SET DATA TYPE "public"."NotificationType" USING "type"::"public"."NotificationType";