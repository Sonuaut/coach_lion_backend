-- AlterTable
ALTER TABLE "UserOnboardingStep" ADD COLUMN     "ageRange" TEXT,
ADD COLUMN     "coachAvatar" TEXT,
ADD COLUMN     "coachSelection" TEXT,
ADD COLUMN     "coachStyle" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "planType" TEXT,
ALTER COLUMN "focusArea" DROP NOT NULL;
