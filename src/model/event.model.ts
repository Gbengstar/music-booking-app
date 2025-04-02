import { model, Schema } from 'mongoose';
import { IEvent } from '../interface/event.interface';
import { EventStatusEnum } from '../enum/event.enum';

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
      enum: EventStatusEnum,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    coverImage: { type: String },
    deleted: { type: Boolean, select: false, default: false },
  },
  { timestamps: true }
);

export const EventModel = model('Event', eventSchema);
