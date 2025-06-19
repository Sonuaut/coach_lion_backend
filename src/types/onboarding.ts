

export const OnboardingField = {
  FOCUS_AREA: 'focusArea',
  COACH_TYPE: 'coachType',
  COACH_LOOK: 'coachLook',
  COACH_STYLE: 'coachStyle',
  AGE_RANGE: 'ageRange',
  GENDER: 'gender',
  PLAN_TYPE: 'planType'
} as const;

export type OnboardingFieldKey = typeof OnboardingField[keyof typeof OnboardingField];

// Enums for onboarding values
export enum FocusArea {
  MONEY = 'Money',
  FITNESS = 'Fitness',
  MINDSET = 'Mindset'
}

export enum CoachType {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual'
}

export enum CoachStyle {
  MOTIVATIONAL = 'Motivational',
  CALM_AND_SUPPORTIVE = 'Calm and Supportive',
  NOT_ACCOUNTABILITY = 'Not Accountability',
  NOT_SURE = 'Not Sure'
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
  coachType: CoachType;
  coachLook: string;
  coachStyle: CoachStyle;
  ageRange: AgeRange;
  gender: Gender;
  planType: PlanType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OnboardingRequest {
  focusArea?: FocusArea;
  coachType?: CoachType;
  coachLook?: string;
  coachStyle?: CoachStyle;
  ageRange?: AgeRange;
  gender?: Gender;
  planType?: PlanType;
}

// Helper functions to get enum values
export const getFocusAreaValues = (): string[] => Object.values(FocusArea);
export const getCoachTypeValues = (): string[] => Object.values(CoachType);
export const getCoachStyleValues = (): string[] => Object.values(CoachStyle);
export const getAgeRangeValues = (): string[] => Object.values(AgeRange);
export const getGenderValues = (): string[] => Object.values(Gender);
export const getPlanTypeValues = (): string[] => Object.values(PlanType); 