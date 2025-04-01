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
  photos: [{ type: String }],
  demoLinks: [{ type: String }],
});

export const ArtistModel = model('Artist', artistProfileSchema);
