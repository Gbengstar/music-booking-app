import { CacheService } from './cache.service';
import { Service } from 'typedi';
import { IArtist } from '../interface/artist.interface';
import { ArtistModel } from '../model/artist.model';
import { FilterQuery, Types } from 'mongoose';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';

@Service()
export class ArtistService {
  private readonly cacheKey = 'artist-service-cache';

  constructor(private readonly cacheService: CacheService) {}
  async getProfile(user: string): Promise<IArtist> {
    const key = this.cacheKey + user;
    return this.cacheService.getOrLoad(key, () => this.findOneOrFail({ user }));
  }

  private async findOneOrFail(filter: FilterQuery<IArtist>) {
    const artist = await ArtistModel.findOne(filter);

    if (!artist) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Artist not found');
    }

    return artist;
  }

  async createProfile(artistData: IArtist): Promise<IArtist> {
    const artistExist = await ArtistModel.exists({ user: artistData.user });
    if (artistExist) {
      throw new CustomError(
        HttpStatusCode.BAD_REQUEST,
        'Artist profile already exist'
      );
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
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        'Artist profile not found'
      );
    }

    return updatedArtist;
  }

  async checkIfAllArtistExist(artists: Types.ObjectId[]) {
    const artistsFound = await ArtistModel.find({ user: { $in: artists } });

    if (artistsFound.length !== artists.length) {
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        'One or more artist profile not found'
      );
    }

    return artistsFound;
  }
}
