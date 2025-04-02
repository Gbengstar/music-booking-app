import { validate } from './../helper/validator.helper';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { EventService } from '../service/event.service';
import { IRequest } from '../interface/request.interface';
import {
  createVenueValidator,
  updateVenueValidator,
} from '../validator/venue.validator';
import { VenueService } from '../service/venue.service';
import { objectIdValidator } from '../validator/common.validator';

@Service()
@Controller()
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly eventService: EventService
  ) {}

  async createVenue(req: IRequest, res: Response) {
    const venue = await validate(createVenueValidator, req.body);
    const newEvent = await this.venueService.createVenue(req.auth.id, venue);

    ResponseHandler.created(res, newEvent);
  }

  async updateVenue(req: IRequest, res: Response) {
    const { id, ...venueData } = await validate(updateVenueValidator, req.body);
    const updatedEvent = await this.venueService.updateVenueData(id, venueData);

    ResponseHandler.created(res, updatedEvent);
  }

  async allVenues(req: Request, res: Response) {
    const events = await this.venueService.allVenues();

    ResponseHandler.ok(res, events);
  }

  async deleteVenue(req: IRequest, res: Response) {
    const { id } = await validate(objectIdValidator, {
      id: req.params.id,
    });
    await this.venueService.updateVenueData(id, { deleted: true });

    ResponseHandler.ok(res, true);
  }

  async venusEvents(req: Request, res: Response) {
    const { id } = await validate(objectIdValidator, {
      id: req.params.id,
    });
    const events = await this.eventService.allEvents({ venue: id });

    ResponseHandler.ok(res, events);
  }
}
