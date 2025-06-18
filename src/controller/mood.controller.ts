import { Request, Response } from 'express';
import MoodService from '../service/mood.service';

const _moodService = new MoodService();

export async function setMood(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const { mood, note, date } = req.body;
  if (!mood) {
    return res.status(400).json({ success: false, message: 'Mood is required' });
  }
  const moodEntry = await _moodService.setMood(userId, mood, note, date);
  return res.status(201).json({ success: true, data: moodEntry });
}

export async function getMood(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const { date } = req.query;
  const moodEntry = await _moodService.getMood(userId, date ? new Date(date as string) : undefined);
  return res.status(200).json({ success: true, data: moodEntry });
} 