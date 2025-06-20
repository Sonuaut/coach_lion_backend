import { ChatMessageDatabase } from '../database/implementations/prisma/chatmessagedb';
import { UserTaskDatabase } from '../database/implementations/prisma/usertaskdb';
import OpenAI from 'openai';
import CommonVariables from '../config';
import { generateChatPrompt, OnboardingPreferences } from '../utils/prompts';

const openai = new OpenAI({ apiKey: CommonVariables.OPENAI_API_KEY });
const chatDB = new ChatMessageDatabase();
const userTaskDB = new UserTaskDatabase();

export class ChatMessageService {

    async handleUserMessage(
      userId: string,
      userMessage: string,
      onboardingPrefs: OnboardingPreferences,
      date: string
    ) {
      const [taskRow, rawHistory] = await Promise.all([
        userTaskDB.getUserTaskForDate(userId, date),
        chatDB.getMessagesForDate(userId, date),
      ]);
  
      if (!taskRow) throw new Error('No task found for today. Please generate your daily task first.');
      const messages = generateChatPrompt(onboardingPrefs, taskRow.task, rawHistory ?? [], userMessage);
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        max_tokens: 300,
        temperature: 0.8,
      });
  
      let coachReply = completion.choices[0].message.content?.trim() || '';
      if (!coachReply) throw new Error('Failed to get coach reply');
  
      await chatDB.createMessages([
        { userId, date, role: 'user', message: userMessage },
        { userId, date, role: 'assistant', message: coachReply },
      ]);
  
      const parsed = JSON.parse(coachReply);
      if (parsed && parsed.allTasksCompleted && parsed.feedback) {
        await userTaskDB.updateUserTaskFeedback(userId, date, parsed.feedback);
      }
  
      return parsed?.reply;
    }
  
  
 
  
  async getTodaysChatHistory(userId: string, date: string) {
    return await chatDB.getMessagesForDate(userId, date);
  }

  async getAllChatMessagesForUser(userId: string) {
    return await chatDB.getAllMessagesForUser(userId);
  }
} 