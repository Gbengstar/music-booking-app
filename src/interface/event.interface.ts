import { Types } from 'mongoose';
import { EventStatusEnum } from '../enum/event.enum';

export interface IEvent {
  title: string;
  description: string;
  artists: Types.ObjectId[];
  venue: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  ticketPrice: number;
  availableTickets: number;
  eventType: string;
  genres: string[];
  status: EventStatusEnum;
  createdBy: Types.ObjectId;
  coverImage: string;
  deleted: boolean;
}
