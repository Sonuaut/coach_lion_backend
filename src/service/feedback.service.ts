import { FeedbackDatabase } from '../database/implementations/prisma/feedbackdb';
import { IFeedback } from '../types/feedback';
import { getTodayDateString } from '../utils/helper';



export default class FeedbackService {
  private _feedbackDB: FeedbackDatabase;

  constructor() {
    this._feedbackDB = new FeedbackDatabase();
  }

  async submitFeedback(userId: string, message: string, date?: Date): Promise<IFeedback | null> {
    const feedbackDate = getTodayDateString(date);
    const result = await this._feedbackDB.createFeedback(userId, message, feedbackDate);
    return result?.data || null;
  }

  async getAllFeedbacks(userId: string): Promise<IFeedback[]> {
    const result = await this._feedbackDB.getAllFeedbacks(userId);
    return result?.data || [];
  }
} 