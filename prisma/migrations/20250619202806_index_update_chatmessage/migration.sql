-- DropIndex
DROP INDEX "ChatMessage_userId_date_idx";

-- CreateIndex
CREATE INDEX "ChatMessage_userId_date_createdAt_idx" ON "ChatMessage"("userId", "date", "createdAt");
