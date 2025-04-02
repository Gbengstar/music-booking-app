import Joi from 'joi';
import { IVenue, IVenueAddress } from '../interface/venue.interface';
import {
  arrayValidator,
  idValidator,
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
  photos: arrayValidator.items(stringValidator.uri().required()).required(),
  amenities: arrayValidator.items(stringValidator.required()),
  bookingPolicies: stringValidator,
});

export const updateVenueValidator = Joi.object<IVenue & { id: string }>({
  name: stringValidator,
  description: stringValidator,
  address: venueAddressValidator,
  capacity: numberValidator.min(1).positive().integer(),
  photos: arrayValidator.items(stringValidator.uri().required()),
  amenities: arrayValidator.items(stringValidator.required()),
  bookingPolicies: stringValidator,
  id: idValidator.required(),
});
