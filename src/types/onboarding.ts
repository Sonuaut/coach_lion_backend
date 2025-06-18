// Enums for onboarding values
export enum FocusArea {
  MONEY = 'Money',
  FITNESS = 'Fitness',
  MINDSET = 'Mindset'
}

export enum CoachSelection {
  AUTO = 'auto',
  MANUAL = 'manual'
}

export enum CoachStyle {
  MOTIVATIONAL = 'Motivational',
  CALM = 'Calm',
  STRUCTURED = 'Structured',
  CASUAL = 'Casual',
  PROFESSIONAL = 'Professional'
}

export enum AgeRange {
  EIGHTEEN_TO_TWENTY_FIVE = '18-25',
  TWENTY_SIX_TO_THIRTY_FIVE = '26-35',
  THIRTY_SIX_TO_FORTY_FIVE = '36-45',
  FORTY_SIX_TO_FIFTY_FIVE = '46-55',
  FIFTY_FIVE_PLUS = '55+'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say'
}

export enum PlanType {
  FREE = 'free',
  PRO = 'pro'
}

// Main interfaces using enums
export interface IUserOnboarding {
  id?: string;
  userId: string;
  focusArea: FocusArea;
  coachSelection: CoachSelection;
  coachAvatar: string;
  coachStyle: CoachStyle;
  ageRange: AgeRange;
  gender: Gender;
  planType: PlanType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OnboardingRequest {
  focusArea?: FocusArea;
  coachSelection?: CoachSelection;
  coachAvatar?: string;
  coachStyle?: CoachStyle;
  ageRange?: AgeRange;
  gender?: Gender;
  planType?: PlanType;
}

// Helper functions to get enum values
export const getFocusAreaValues = (): string[] => Object.values(FocusArea);
export const getCoachSelectionValues = (): string[] => Object.values(CoachSelection);
export const getCoachStyleValues = (): string[] => Object.values(CoachStyle);
export const getAgeRangeValues = (): string[] => Object.values(AgeRange);
export const getGenderValues = (): string[] => Object.values(Gender);
export const getPlanTypeValues = (): string[] => Object.values(PlanType); 