import { model, Schema } from 'mongoose';
import { IEvent } from '../interface/event.interface';

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    artists: {
      type: [Schema.Types.ObjectId],
      ref: 'Artist',
      required: true,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    eventType: { type: String },
    genres: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled'],
      default: 'draft',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: { type: String },
  },
  { timestamps: true }
);

export const EventModel = model('Event', eventSchema);
