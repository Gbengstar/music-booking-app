import { Service } from 'typedi';
import { IEvent } from '../interface/event.interface';
import { EventModel } from '../model/event.model';
import { ArtistService } from './artist.service';
import { Types, FilterQuery } from 'mongoose';
import { VenueService } from './venue.service';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';

@Service()
export class EventService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly venueService: VenueService
  ) {}

  async createEvent(user: string, eventData: IEvent) {
    eventData.createdBy = new Types.ObjectId(user);

    await Promise.all([
      this.artistService.checkIfAllArtistExist(eventData.artists),
      this.venueService.checkIfVenueExist(eventData.venue),
    ]);

    return EventModel.create(eventData);
  }

  allEvents() {
    return EventModel.find();
  }

  async findOneOrFail(filter: FilterQuery<IEvent>) {
    const event = await EventModel.findOne(filter);
    if (!event) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Event not found');
    }

    return event;
  }
}
