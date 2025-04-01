import { model, Schema } from 'mongoose';
import { IArtist } from '../interface/artist.interface';

const artistProfileSchema = new Schema<IArtist>({
  user: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true },
  bio: { type: String },
  genres: [{ type: String }],
  location: { type: String },
  website: { type: String },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  },
  performanceFee: { type: Number, required: true },
  photos: [{ type: String }],
  demoLinks: [{ type: String }],
  equipmentNeeds: { type: String },
  availability: [
    {
      startDate: Date,
      endDate: Date,
      booked: { type: Boolean, default: false },
    },
  ],
});

export const ArtistModel = model('Artist', artistProfileSchema, 'artist');
