import { Service } from 'typedi';
import { IArtist, IArtistAvailability } from '../interface/artist.interface';
import { ArtistModel } from '../model/artist.model';
import { Document, FilterQuery } from 'mongoose';

@Service()
export class ArtistService {
  async getProfile(user: string): Promise<IArtist> {
    return this.findOneOrFail({ user });
  }

  private async findOneOrFail(filter: FilterQuery<IArtist>) {
    const artist = await ArtistModel.findOne(filter);

    if (!artist) {
      throw new Error('Artist not found');
    }

    return artist;
  }

  async createProfile(artistData: IArtist): Promise<IArtist> {
    const artistExist = await ArtistModel.exists({ user: artistData.user });
    if (artistExist) {
      throw new Error('Artist profile already exist');
    }

    return ArtistModel.create(artistData);
  }

  async updateProfile(user: string, updateData: Partial<IArtist>) {
    const updatedArtist = await ArtistModel.findOneAndUpdate(
      { user },
      updateData,
      {
        new: true,
      }
    );

    if (!updatedArtist) {
      throw new Error('Artist profile not found');
    }

    return updatedArtist;
  }

  async addAvailableTime(user: string, availability: IArtistAvailability[]) {
    const artist = await this.findOneOrFail({ user });
    artist.availability.push(...availability);

    return artist.save();
  }

  async removeAvailableTime(user: string, availabilityId: string) {
    console.debug({ availabilityId });
    const artist = await this.findOneOrFail({ user });
    artist.availability = artist.availability.filter(
      (time: IArtistAvailability & Document) => {
        return time._id.toString() !== availabilityId;
      }
    );

    return artist.save();
  }
}
