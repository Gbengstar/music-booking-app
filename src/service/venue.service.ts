import { Service } from 'typedi';
import { Types } from 'mongoose';
import { IVenue } from '../interface/venue.interface';
import { VenueModel } from '../model/venue.model';
import { CacheService } from './cache.service';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';

@Service()
export class VenueService {
  private readonly cacheKey = 'cache-all-venues';
  constructor(private readonly cacheService: CacheService) {}

  async createVenue(user: string, venueData: IVenue) {
    venueData.createdBy = new Types.ObjectId(user);

    const [newVenue] = await Promise.all([
      VenueModel.create(venueData),
      this.cacheService.delete(this.cacheKey),
    ]);

    return newVenue;
  }

  updateVenue(user: string, eventData: IVenue) {
    eventData.createdBy = new Types.ObjectId(user);

    return VenueModel.create(eventData);
  }

  async allVenues() {
    return this.cacheService.getOrLoad(this.cacheKey, async () => {
      return VenueModel.find();
    });
  }

  async checkIfVenueExist(venueId: Types.ObjectId) {
    const venue = await VenueModel.findById(venueId);

    if (!venue) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Venue not found');
    }

    return venue;
  }
}
