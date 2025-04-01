import Joi from 'joi';
import { IVenue, IVenueAddress } from '../interface/venue.interface';
import {
  arrayValidator,
  numberValidator,
  stringValidator,
} from './common.validator';

const venueAddressValidator = Joi.object<IVenueAddress>({
  street: stringValidator.required(),
  city: stringValidator.required(),
  state: stringValidator.required(),
  zipCode: numberValidator.min(1).positive().integer().required(),
  country: stringValidator,
});

export const createVenueValidator = Joi.object<IVenue>({
  name: stringValidator.required(),
  description: stringValidator.required(),
  address: venueAddressValidator,
  capacity: numberValidator.min(1).positive().integer().required(),
  venueType: stringValidator,
  photos: arrayValidator.items(stringValidator.uri().required()),
  amenities: arrayValidator.items(stringValidator.required()),
  bookingPolicies: stringValidator,
});
