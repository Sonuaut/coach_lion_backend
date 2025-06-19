import prisma from '../../../config/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';

export class UserTaskDatabase {

  async createOrUpdateUserTask(userId: string, date: string, task: string,greeting:string) {
    try {
      return await prisma.userTask.upsert({
        where: { userId_date: { userId, date } },
        update: { task },
        create: { userId, date, task,greeting },
      });
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

  async getUserTaskForDate(userId: string, date: string) {
    try {
      return await prisma.userTask.findUnique({
        where: { userId_date: { userId, date } },
      });
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

  async updateUserTaskFeedback(userId: string, date: string, feedback: string) {
    try {
      return await prisma.userTask.update({
        where: { userId_date: { userId, date } },
        data: { feedback },
      });
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