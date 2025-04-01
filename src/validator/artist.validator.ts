import Joi from 'joi';
import {
  booleanValidator,
  dateValidator,
  stringValidator,
} from './common.validator';
import { IArtist } from '../interface/artist.interface';

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
  website: stringValidator.uri().required(),
  socialMedia: socialMediaValidator,
  photos: Joi.array().items(stringValidator.uri()).min(1).required(),
  demoLinks: Joi.array().items(stringValidator.uri()).min(1).required(),
});

export const updateArtistProfileValidator = Joi.object<IArtist>({
  user: stringValidator,
  name: stringValidator,
  bio: stringValidator,
  genres: Joi.array().items(stringValidator).min(1),
  location: stringValidator,
  website: stringValidator,
  socialMedia: socialMediaValidator,
  photos: Joi.array().items(stringValidator).min(1),
  demoLinks: Joi.array().items(stringValidator.uri()).min(1),
});
