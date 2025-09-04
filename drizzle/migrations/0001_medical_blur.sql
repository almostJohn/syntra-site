CREATE TYPE "public"."team_role" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'refactor';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'testing';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'design';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'research';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'spec';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'marketing';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'sales';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'support';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'ops';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'finance';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'planning';--> statement-breakpoint
ALTER TYPE "public"."task_category" ADD VALUE 'meeting';--> statement-breakpoint
CREATE TABLE "team_members" (
	"team_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "team_role" DEFAULT 'member' NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_team_id_user_id_pk" PRIMARY KEY("team_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;