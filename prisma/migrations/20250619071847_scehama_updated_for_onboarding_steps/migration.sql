/*
  Warnings:

  - You are about to drop the `UserOnboarding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnboarding" DROP CONSTRAINT "UserOnboarding_userId_fkey";

-- DropTable
DROP TABLE "UserOnboarding";

-- CreateTable
CREATE TABLE "UserOnboardingStep" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "onBoardingStep" INTEGER NOT NULL,
    "focusArea" TEXT NOT NULL,

    CONSTRAINT "UserOnboardingStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnboardingStatus" (
    "userId" TEXT NOT NULL,
    "isOnBoardingCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserOnboardingStatus_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboardingStep_userId_onBoardingStep_key" ON "UserOnboardingStep"("userId", "onBoardingStep");

-- AddForeignKey
ALTER TABLE "UserOnboardingStep" ADD CONSTRAINT "UserOnboardingStep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnboardingStatus" ADD CONSTRAINT "UserOnboardingStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
