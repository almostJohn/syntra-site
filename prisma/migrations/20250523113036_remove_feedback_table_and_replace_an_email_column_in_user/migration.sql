/*
  Warnings:

  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- DropTable
DROP TABLE "Feedback";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
