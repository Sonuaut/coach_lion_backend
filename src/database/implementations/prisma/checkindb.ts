import { PrismaClient } from '../../../generated/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';
import { IUserCheckin } from '../../../types/checkins';

export class CheckinDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCheckin(userId: string, date: string) {
    try {
      const checkin = await this.prisma.userCheckin.create({
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
      const checkins = await this.prisma.userCheckin.findMany({
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
      const checkin = await this.prisma.userCheckin.findFirst({
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