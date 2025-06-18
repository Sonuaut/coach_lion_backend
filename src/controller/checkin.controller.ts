import { Request, Response } from 'express';
import CheckinService from '../service/checkin.service';

const _checkinService = new CheckinService();

export async function checkInToday(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const { data, error } = await _checkinService.checkInToday(userId);
  if (error) {
    return res.status(409).json({ success: false, message: error, data });
  }
  return res.status(201).json({ success: true, message: 'Checked in for today', data });
}

export async function getAllCheckins(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const data = await _checkinService.getAllCheckins(userId);
  return res.status(200).json({ success: true, data });
}

export async function getTodayCheckin(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const data = await _checkinService.getTodayCheckin(userId);
  return res.status(200).json({ success: true, data });
} 