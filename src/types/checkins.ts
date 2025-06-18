export interface IUserCheckin {
  id?: string;
  userId: string;
  date: string;
  createdAt?: Date;
}

export interface CheckinRequest {}

export interface CheckinResponse {
  id: string;
  userId: string;
  date: string;
  createdAt: Date;
} 