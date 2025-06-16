/*
  Warnings:

  - The values [CREATE_TEAM,UPDATE_TEAM,DELETE_TEAM] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `schedule_task_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Adherence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMPLETE', 'IN_PROGRESS', 'COMPLETE', 'BLOCKED', 'ARCHIVED');

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'CREATE_NOTE', 'UPDATE_NOTE', 'DELETE_NOTE', 'REMINDER', 'ALERT', 'INFO');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Adherence" DROP CONSTRAINT "Adherence_schedule_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_schedule_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_team_id_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleTask" DROP CONSTRAINT "ScheduleTask_assigned_to_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleTask" DROP CONSTRAINT "ScheduleTask_created_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleTask" DROP CONSTRAINT "ScheduleTask_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_owner_id_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "schedule_task_id",
DROP COLUMN "team_id",
ADD COLUMN     "note_id" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "is_completed",
DROP COLUMN "subtitle",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'INCOMPLETE';

-- DropTable
DROP TABLE "Adherence";

-- DropTable
DROP TABLE "Invite";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "ScheduleTask";

-- DropTable
DROP TABLE "Team";

-- DropEnum
DROP TYPE "InviteStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
