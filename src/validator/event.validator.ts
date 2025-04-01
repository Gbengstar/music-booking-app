import Joi from 'joi';
import {
  dateValidator,
  idValidator,
  numberValidator,
  stringValidator,
} from './custom.validator';
import { IEvent } from '../interface/event.interface';

export const createEventValidator = Joi.object<IEvent>({
  title: stringValidator.required(),
  description: stringValidator.required(),
  artist: idValidator.required(),
  venue: idValidator.required(),
  date: dateValidator.required(),
  startTime: stringValidator.required(),
  endTime: stringValidator.required(),
  ticketPrice: numberValidator.required(),
  availableTickets: numberValidator.min(1).positive().required(),
  eventType: stringValidator.required(),
  genres: Joi.array().items(stringValidator.required()),
  status: Joi.string(),
  coverImage: Joi.string().uri(),
});
