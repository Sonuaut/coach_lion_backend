import prisma from '../../../config/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';

export class ChatMessageDatabase {

  async createMessage(
    userId: string,
    date: string,
    role: 'user' | 'assistant',
    message: string
  ) {
    try {
      return await prisma.chatMessage.create({
        data: { userId, date, role, message },
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

  async createMessages(messages: {
    userId: string;
    date: string;
    role: 'user' | 'assistant';
    message: string;
  }[]) {
    try {
      if (messages.length === 0) return;
      return await prisma.chatMessage.createMany({
        data: messages,
        skipDuplicates: false, // Set to true if you want to avoid duplicate inserts
      });
    } catch (error: any) {
      const dbError: DBErrorResponse = {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'Bulk message insertion failed',
        details: error.details || 'Unknown database error during batch insert',
        hint: error.hint || null
      };
      throwDBError(dbError);
    }
  }

  async getMessagesForDate(userId: string, date: string) {
    try {
      const messages= await prisma.chatMessage.findMany({
        where: {
          userId,
          date,
          role: { in: ['user', 'assistant'] }
        },
        orderBy: { createdAt: 'asc' },
        select: {
          role: true,
          message: true
        }
      });
      return messages.map((m:any) => ({ role: m.role as 'user' | 'assistant', message: m.message }));
    } catch (error: any) {
      const dbError: DBErrorResponse = {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'Failed to fetch chat history',
        details: error.details || 'Unknown database error during fetch',
        hint: error.hint || null
      };
      throwDBError(dbError);
    }
  }
}
