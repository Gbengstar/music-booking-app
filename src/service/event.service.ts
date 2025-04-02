import { Service } from 'typedi';
import { IEvent } from '../interface/event.interface';
import { EventModel } from '../model/event.model';
import { ArtistService } from './artist.service';
import { Types, FilterQuery, PopulateOptions, PopulateOption } from 'mongoose';
import { VenueService } from './venue.service';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';
import { EventStatusEnum } from '../enum/event.enum';

@Service()
export class EventService {
  private readonly populateEventData: PopulateOptions[] = [
    { path: 'venue' },
    { path: 'artists', model: 'Artist', foreignField: 'user' },
    { path: 'createdBy', select: 'email' },
  ];

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

  async updateEventData(eventId: string, eventData: Partial<IEvent>) {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      eventData,
      { new: true }
    ).populate(this.populateEventData);

    if (!updatedEvent) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Event not found');
    }

    return updatedEvent;
  }

  allEvents(filter: FilterQuery<IEvent> = {}) {
    return EventModel.find({ ...filter, deleted: false }).populate(
      this.populateEventData
    );
  }

  async findOneOrFail(filter: FilterQuery<IEvent>) {
    const event = await EventModel.findOne(filter);
    if (!event) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, 'Event not found');
    }

    return event;
  }
}
