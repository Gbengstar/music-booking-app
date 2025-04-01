import { Service } from 'typedi';
import { IEvent } from '../interface/event.interface';
import { EventModel } from '../model/event.model';
import { ArtistService } from './artist.service';

@Service()
export class EventService {
  constructor(private readonly artistService: ArtistService) {}

  createEvent(eventData: IEvent) {
    return EventModel.create(eventData);
  }

  allEvents() {
    return EventModel.find();
  }
}
