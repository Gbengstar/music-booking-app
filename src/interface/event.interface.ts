import { Types } from 'mongoose';

export interface IEvent {
  title: string;
  description: string;
  artist: Types.ObjectId;
  venue: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  ticketPrice: number;
  availableTickets: number;
  eventType: string;
  genres: string[];
  status: 'draft' | 'published' | 'cancelled';
  createdBy: Types.ObjectId;
  coverImage: string;
}
