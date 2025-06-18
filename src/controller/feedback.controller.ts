import { Request, Response } from 'express';
import FeedbackService from '../service/feedback.service';

const _feedbackService = new FeedbackService();

export async function submitFeedback(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const { message, date } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }
  const feedback = await _feedbackService.submitFeedback(userId, message, date);
  return res.status(201).json({ success: true, data: feedback });
}

export async function getAllFeedbacks(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const feedbacks = await _feedbackService.getAllFeedbacks(userId);
  return res.status(200).json({ success: true, data: feedbacks });
} 