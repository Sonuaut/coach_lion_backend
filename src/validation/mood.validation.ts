import { z } from 'zod';
import { MoodType } from '../types/mood';

export const moodSchema = z.object({
  mood: z.nativeEnum(MoodType),
  note: z.string().optional(),
  date: z.coerce.date().optional(),
}); 