import { Types } from 'mongoose';

export interface IVenueAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IVenue {
  createdBy: Types.ObjectId;
  name: string;
  description: string;
  address: IVenueAddress;
  capacity: number;
  photos: string[];
  amenities: string[];
  bookingPolicies: string;
  deleted: boolean;
}
