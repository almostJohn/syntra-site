ALTER TABLE "notifications" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "status" SET DEFAULT 'unread'::text;--> statement-breakpoint
DROP TYPE "public"."notification_status";--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('archived', 'read', 'unread');--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "status" SET DEFAULT 'unread'::"public"."notification_status";--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "status" SET DATA TYPE "public"."notification_status" USING "status"::"public"."notification_status";