import { PrismaClient } from '../../../generated/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';
import { IMood } from '../../../types/mood';

export class MoodDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async upsertMood(userId: string, mood: string, note: string | undefined, date: string) {
    try {
      const moodEntry = await this.prisma.mood.upsert({
        where: { userId_date: { userId, date } },
        update: { mood, note },
        create: { userId, mood, note, date },
      });
      return { data: moodEntry, error: null };
    } catch (error: any) {
      const dbError: DBErrorResponse = {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'Database operation failed',
        details: error.details || 'Unknown database error',
        hint: error.hint || null
      };
      throwDBError(dbError);
    }
  }

  async getMoodByDate(userId: string, date: string) {
    try {
      const moodEntry = await this.prisma.mood.findUnique({
        where: { userId_date: { userId, date } },
      });
      return { data: moodEntry, error: null };
    } catch (error: any) {
      const dbError: DBErrorResponse = {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'Database operation failed',
        details: error.details || 'Unknown database error',
        hint: error.hint || null
      };
      throwDBError(dbError);
    }
  }
} 