import { z } from 'zod';
import { 
  FocusArea, 
  CoachSelection, 
  CoachStyle, 
  AgeRange, 
  Gender, 
  PlanType 
} from '../types/onboarding';

export const onboardingSchema = z.object({
  focusArea: z.nativeEnum(FocusArea, {
    errorMap: () => ({ message: `Focus area must be one of: ${Object.values(FocusArea).join(', ')}` })
  }).optional(),
  coachSelection: z.nativeEnum(CoachSelection, {
    errorMap: () => ({ message: `Coach selection must be one of: ${Object.values(CoachSelection).join(', ')}` })
  }).optional(),
  coachAvatar: z.string()
    .min(1, "Coach avatar is required")
    .max(100, "Coach avatar must be less than 100 characters")
    .optional(),
  coachStyle: z.nativeEnum(CoachStyle, {
    errorMap: () => ({ message: `Coach style must be one of: ${Object.values(CoachStyle).join(', ')}` })
  }).optional(),
  ageRange: z.nativeEnum(AgeRange, {
    errorMap: () => ({ message: `Age range must be one of: ${Object.values(AgeRange).join(', ')}` })
  }).optional(),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: `Gender must be one of: ${Object.values(Gender).join(', ')}` })
  }).optional(),
  planType: z.nativeEnum(PlanType, {
    errorMap: () => ({ message: `Plan type must be one of: ${Object.values(PlanType).join(', ')}` })
  }).optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one onboarding field must be provided.'
}); 