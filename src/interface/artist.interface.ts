import { Types } from 'mongoose';
export interface IArtistAvailability {
  startDate: Date;
  endDate: Date;
  booked: boolean;
}

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
  performanceFee: number;
  photos: string[];
  demoLinks: string[];
  equipmentNeeds: string;
  availability: IArtistAvailability[];
}
