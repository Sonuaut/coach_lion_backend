/*
  Warnings:

  - You are about to drop the column `coachAvatar` on the `UserOnboardingStep` table. All the data in the column will be lost.
  - You are about to drop the column `coachSelection` on the `UserOnboardingStep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserOnboardingStep" DROP COLUMN "coachAvatar",
DROP COLUMN "coachSelection",
ADD COLUMN     "coachLook" TEXT,
ADD COLUMN     "coachType" TEXT;
