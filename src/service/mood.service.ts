import { MoodDatabase } from '../database/implementations/prisma/mooddb';
import { IMood, MoodType } from '../types/mood';
import { getTodayDateString } from '../utils/helper';



export default class MoodService {
  private _moodDB: MoodDatabase;

  constructor() {
    this._moodDB = new MoodDatabase();
  }

  async setMood(userId: string, mood: string, note?: string, date?: Date): Promise<IMood | null> {
    const moodDate = getTodayDateString(date);
    const result = await this._moodDB.upsertMood(userId, mood, note, moodDate);
    if (!result?.data) return null;
    const moodObj = { ...result.data, mood: result.data.mood as MoodType, note: result.data.note ?? undefined };
    return moodObj;
  }

  async getMood(userId: string, date?: Date): Promise<IMood | null> {
    const moodDate = getTodayDateString(date);
    const result = await this._moodDB.getMoodByDate(userId, moodDate);
    if (!result?.data) return null;
    const moodObj = { ...result.data, mood: result.data.mood as MoodType, note: result.data.note ?? undefined };
    return moodObj;
  }
} 