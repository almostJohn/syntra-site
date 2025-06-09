-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "task_id" DROP NOT NULL,
ALTER COLUMN "schedule_task_id" DROP NOT NULL,
ALTER COLUMN "team_id" DROP NOT NULL;
