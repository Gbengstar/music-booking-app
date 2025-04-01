import Joi from 'joi';
import {
  arrayValidator,
  dateValidator,
  idValidator,
  numberValidator,
  stringValidator,
} from './common.validator';
import { IEvent } from '../interface/event.interface';

export const createEventValidator = Joi.object<IEvent>({
  title: stringValidator.required(),
  description: stringValidator.required(),
  artists: arrayValidator.items(idValidator.required()),
  venue: idValidator.required(),
  date: dateValidator.required(),
  startTime: stringValidator.required(),
  endTime: stringValidator.required(),
  ticketPrice: numberValidator.positive().greater(0).precision(2).required(),
  availableTickets: numberValidator.min(1).positive().integer().required(),
  eventType: stringValidator.required(),
  genres: Joi.array().items(stringValidator.required()),
  status: Joi.string(),
  coverImage: Joi.string().uri(),
});
