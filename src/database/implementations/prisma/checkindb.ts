import prisma  from '../../../config/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';

export class CheckinDatabase {


  async createCheckin(userId: string, date: string) {
    try {
      const checkin = await prisma.userCheckin.create({
        data: { userId, date },
      });
      return { data: checkin, error: null };
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

  async getAllCheckins(userId: string) {
    try {
      const checkins = await prisma.userCheckin.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      });
      return { data: checkins, error: null };
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

  async getTodayCheckin(userId: string, today: string) {
    try {
      const checkin = await prisma.userCheckin.findFirst({
        where: {
          userId,
          date: today,
        },
      });
      return { data: checkin, error: null };
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