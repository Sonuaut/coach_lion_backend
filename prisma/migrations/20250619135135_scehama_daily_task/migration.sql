-- CreateTable
CREATE TABLE "DailyTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "greeting" TEXT NOT NULL,
    "tasks" JSONB NOT NULL,

    CONSTRAINT "DailyTask_pkey" PRIMARY KEY ("id")
);
