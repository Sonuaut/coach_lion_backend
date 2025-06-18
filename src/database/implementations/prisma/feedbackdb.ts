import { PrismaClient } from '../../../generated/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';
import { IFeedback } from '../../../types/feedback';

export class FeedbackDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createFeedback(userId: string, message: string, date: string) {
    try {
      const feedback = await this.prisma.feedback.create({
        data: { userId, message, date },
      });
      return { data: feedback, error: null };
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

  async getAllFeedbacks(userId: string) {
    try {
      const feedbacks = await this.prisma.feedback.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      });
      return { data: feedbacks, error: null };
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