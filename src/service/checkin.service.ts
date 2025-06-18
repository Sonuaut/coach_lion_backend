import { CheckinDatabase } from '../database/implementations/prisma/checkindb';
import { IUserCheckin } from '../types/checkins';
import { getTodayDateString } from '../utils/helper';



export default class CheckinService {
  private _checkinDB: CheckinDatabase;

  constructor() {
    this._checkinDB = new CheckinDatabase();
  }

  async checkInToday(userId: string): Promise<{ data: IUserCheckin | null; error?: string }> {
    const today = getTodayDateString();
    const result = await this._checkinDB.getTodayCheckin(userId, today);
    const existingCheckin = result?.data;
    if (existingCheckin) {
      return { data: existingCheckin, error: 'Already checked in today' };
    }
    const createResult = await this._checkinDB.createCheckin(userId, today);
    const checkin = createResult?.data || null;
    return { data: checkin };
  }

  async getAllCheckins(userId: string): Promise<IUserCheckin[]> {
    const result = await this._checkinDB.getAllCheckins(userId);
    return result?.data || [];
  }

  async getTodayCheckin(userId: string): Promise<IUserCheckin | null> {
    const today = getTodayDateString();
    const result = await this._checkinDB.getTodayCheckin(userId, today);
    return result?.data || null;
  }
} 