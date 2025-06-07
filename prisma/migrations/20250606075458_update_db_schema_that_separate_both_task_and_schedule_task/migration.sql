/*
  Warnings:

  - The values [TASK_ASSIGNMENT] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `task_id` on the `Adherence` table. All the data in the column will be lost.
  - You are about to drop the column `actual_end_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `actual_start_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `adherence_notes` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_to_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `planned_end_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `planned_start_time` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[schedule_task_id]` on the table `Adherence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_task_id` to the `Adherence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_task_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `task_id` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `content` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('SCHEDULE_TASK_ASSIGNMENT', 'CREATE_TASK', 'DELETE_TASK', 'UPDATE_USER', 'UPDATE_TEAM', 'REMINDER', 'ALERT', 'INFO');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'WORKFORCE_MANAGER';
ALTER TYPE "Role" ADD VALUE 'LEADER';

-- DropForeignKey
ALTER TABLE "Adherence" DROP CONSTRAINT "Adherence_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigned_to_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_team_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_team_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_user_id_fkey";

-- DropIndex
DROP INDEX "Adherence_task_id_key";

-- AlterTable
ALTER TABLE "Adherence" DROP COLUMN "task_id",
ADD COLUMN     "schedule_task_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "schedule_task_id" TEXT NOT NULL,
ADD COLUMN     "team_id" TEXT NOT NULL,
ALTER COLUMN "task_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "actual_end_time",
DROP COLUMN "actual_start_time",
DROP COLUMN "adherence_notes",
DROP COLUMN "assigned_to_id",
DROP COLUMN "created_by_id",
DROP COLUMN "description",
DROP COLUMN "planned_end_time",
DROP COLUMN "planned_start_time",
DROP COLUMN "team_id",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "TeamMember";

-- CreateTable
CREATE TABLE "ScheduleTask" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "planned_start_time" TIMESTAMP(3) NOT NULL,
    "planned_end_time" TIMESTAMP(3) NOT NULL,
    "actual_start_time" TIMESTAMP(3) NOT NULL,
    "actual_end_time" TIMESTAMP(3) NOT NULL,
    "adherence_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "team_id" TEXT NOT NULL,
    "assigned_to_user_id" TEXT NOT NULL,
    "created_by_user_id" TEXT NOT NULL,

    CONSTRAINT "ScheduleTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_user_id_team_id_key" ON "Member"("user_id", "team_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adherence_schedule_task_id_key" ON "Adherence"("schedule_task_id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTask" ADD CONSTRAINT "ScheduleTask_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTask" ADD CONSTRAINT "ScheduleTask_assigned_to_user_id_fkey" FOREIGN KEY ("assigned_to_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTask" ADD CONSTRAINT "ScheduleTask_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adherence" ADD CONSTRAINT "Adherence_schedule_task_id_fkey" FOREIGN KEY ("schedule_task_id") REFERENCES "ScheduleTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_schedule_task_id_fkey" FOREIGN KEY ("schedule_task_id") REFERENCES "ScheduleTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
