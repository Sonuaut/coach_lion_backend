import { z } from 'zod';

export const onboardingSchema = z.object({
  onBoardingStep: z.coerce.number({
    required_error: 'onBoardingStep is required',
    invalid_type_error: 'onBoardingStep must be a number',
  }),
  values: z.object({}).passthrough().refine((obj) => Object.keys(obj).length > 0, {
    message: 'At least one onboarding value must be provided.'
  })
}); 