export interface IFeedback {
  id?: string;
  userId: string;
  message: string;
  date: string;
  createdAt?: Date;
}

export interface FeedbackRequest {
  message: string;
  date?: string;
}

export interface FeedbackResponse {
  id: string;
  userId: string;
  message: string;
  date: string;
  createdAt: Date;
} 