export enum MoodType {
  HAPPY = 'happy',
  VERYHAPPY = 'veryhappy',
  VERYSAD = 'verysad',
  SAD = 'sad',
  SLEEPING='sleeping'
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