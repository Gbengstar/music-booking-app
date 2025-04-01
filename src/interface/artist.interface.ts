import { Types } from 'mongoose';

export interface IArtist {
  user: Types.ObjectId;
  name: string;
  bio: string;
  genres: string[];
  location: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  photos: string[];
  demoLinks: string[];
}
