import { UserTaskDatabase } from '../database/implementations/prisma/usertaskdb';
import OpenAI from 'openai';
import CommonVariables from '../config';
import { generatePersonalizedTaskPrompt, OnboardingPreferences } from '../utils/prompts';
import { throwBusinessError } from '../utils/error.utils';

const openai = new OpenAI({ apiKey: CommonVariables.OPENAI_API_KEY });
const userTaskDB = new UserTaskDatabase();

export class UserTaskService {
  async generateAndStoreTask(userId: string, onboardingPrefs: OnboardingPreferences, date: string) {
    // Check if a task already exists for today
    const existingTask = await userTaskDB.getUserTaskForDate(userId, date);
    throwBusinessError(!!existingTask, 'A task for today already exists. You cannot create another task for today.');

    const prompt = generatePersonalizedTaskPrompt(onboardingPrefs) as { role: 'system' | 'user' | 'assistant', content: string }[];
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: prompt,
      max_tokens: 300,
      temperature: 0.8,
    });
    const task = completion.choices[0].message.content?.trim() || '';
    const cleaned = completion.choices[0].message.content!.replace(/\n/g, '').replace(/\"/g, '"').trim();
    const parsed = JSON.parse(cleaned);
    throwBusinessError(!task, 'Failed to generate task');
    return await userTaskDB.createOrUpdateUserTask(userId, date, parsed.task, parsed.greeting);
  }


  async getUSerTaskForDate(userId: string, date: string) {
    return await userTaskDB.getUserTaskForDate(userId, date);
  }
} 