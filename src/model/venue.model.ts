import { model, Schema } from 'mongoose';
import { IVenue } from '../interface/venue.interface';

const venueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true },
    description: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    capacity: { type: Number },
    venueType: { type: String },
    photos: [{ type: String }],
    amenities: [{ type: String }],
    bookingPolicies: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  },
  { timestamps: true }
);

export const VenueModel = model('Venue', venueSchema);
