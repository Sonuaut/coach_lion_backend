export enum MoodType {
  HAPPY = 'Happy',
  STRESSED = 'Stressed',
  MOTIVATED = 'Motivated',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  CALM = 'Calm',
  EXCITED = 'Excited',
  // Add more as needed
}

export interface IMood {
  id?: string;
  userId: string;
  mood: MoodType;
  note?: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MoodRequest {
  mood: MoodType;
  note?: string;
  date?: string;
}

export interface MoodResponse {
  id: string;
  userId: string;
  mood: MoodType;
  note?: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
} 