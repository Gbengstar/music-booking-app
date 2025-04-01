import Joi from 'joi';
import {
  booleanValidator,
  dateValidator,
  numberValidator,
  stringValidator,
} from './custom.validator';
import { IArtist } from '../interface/artist.interface';
import { AddAvailability } from '../dto/artist.dto';

export const availabilityValidator = Joi.array()
  .items(
    Joi.object({
      startDate: dateValidator,
      endDate: dateValidator,
      booked: booleanValidator.default(false),
    })
  )
  .min(1);

const socialMediaValidator = Joi.object({
  facebook: stringValidator,
  instagram: stringValidator,
  twitter: stringValidator,
  youtube: stringValidator,
});

export const createArtistProfileValidator = Joi.object<IArtist>({
  user: stringValidator.required(),
  name: stringValidator.required(),
  bio: stringValidator.required(),
  genres: Joi.array().items(stringValidator).min(1).required(),
  location: stringValidator.required(),
  website: stringValidator.required(),
  socialMedia: socialMediaValidator,
  performanceFee: numberValidator.default(0),
  photos: Joi.array().items(stringValidator.uri()).min(1).required(),
  demoLinks: Joi.array().items(stringValidator.uri()).min(1).required(),
  equipmentNeeds: stringValidator,
  availability: availabilityValidator.min(1).required(),
});

export const updateArtistProfileValidator = Joi.object<IArtist>({
  user: stringValidator,
  name: stringValidator,
  bio: stringValidator,
  genres: Joi.array().items(stringValidator).min(1),
  location: stringValidator,
  website: stringValidator,
  socialMedia: socialMediaValidator,
  performanceFee: numberValidator,
  photos: Joi.array().items(stringValidator).min(1),
  demoLinks: Joi.array().items(stringValidator.uri()).min(1),
  equipmentNeeds: stringValidator,
  availability: availabilityValidator,
});

export const artistAvailabilityValidator = Joi.object<AddAvailability>({
  availability: availabilityValidator.min(1).required(),
});
