import Joi from 'joi';
import {
  arrayValidator,
  dateValidator,
  idValidator,
  numberValidator,
  stringValidator,
} from './common.validator';
import { IEvent } from '../interface/event.interface';
import { EventStatusEnum } from '../enum/event.enum';
import { MusicGenre } from '../enum/music-genre.enum';

export const createEventValidator = Joi.object<IEvent>({
  title: stringValidator.required(),
  description: stringValidator.required(),
  artists: arrayValidator.items(idValidator.required()).required(),
  venue: idValidator.required(),
  date: dateValidator.required(),
  startTime: stringValidator.required(),
  endTime: stringValidator.required(),
  ticketPrice: numberValidator.positive().greater(0).precision(2).required(),
  availableTickets: numberValidator.min(1).positive().integer().required(),
  eventType: stringValidator.required(),
  genres: Joi.array()
    .items(stringValidator.valid(...Object.values(MusicGenre)).required())
    .required(),
  status: Joi.string()
    .default(EventStatusEnum.DRAFT)
    .valid(EventStatusEnum.DRAFT),
  coverImage: Joi.string().uri(),
});

export const updateEventValidator = Joi.object<IEvent & { id: string }>({
  title: stringValidator,
  description: stringValidator,
  artists: arrayValidator.items(idValidator.required()),
  venue: idValidator.required(),
  date: dateValidator.required(),
  startTime: stringValidator,
  endTime: stringValidator,
  ticketPrice: numberValidator.positive().greater(0).precision(2),
  availableTickets: numberValidator.min(1).positive().integer(),
  eventType: stringValidator.required(),
  genres: Joi.array().items(stringValidator.required()),
  coverImage: Joi.string().uri(),
  id: idValidator.required(),
});

export const updateEventStatusValidator = Joi.object<IEvent & { id: string }>({
  status: Joi.string()
    .valid(...Object.values(EventStatusEnum))
    .required(),
  id: idValidator.required(),
});
