-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "Mood_userId_idx" ON "Mood"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserCheckin_userId_idx" ON "UserCheckin"("userId");

-- CreateIndex
CREATE INDEX "UserOnboardingStatus_userId_idx" ON "UserOnboardingStatus"("userId");

-- CreateIndex
CREATE INDEX "UserOnboardingStep_userId_idx" ON "UserOnboardingStep"("userId");
