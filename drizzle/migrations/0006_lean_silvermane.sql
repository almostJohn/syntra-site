ALTER TABLE "comments" DROP CONSTRAINT "comments_text_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "task_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "text_id";