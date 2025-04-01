import { validate } from './../helper/validator.helper';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { EventService } from '../service/event.service';
import { IRequest } from '../interface/request.interface';
import { createVenueValidator } from '../validator/venue.validator';
import { VenueService } from '../service/venue.service';

@Service()
@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  async createVenue(req: IRequest, res: Response) {
    const venue = await validate(createVenueValidator, req.body);
    const newEvent = await this.venueService.createVenue(req.auth.id, venue);

    ResponseHandler.created(res, newEvent);
  }

  async allVenues(req: Request, res: Response) {
    const events = await this.venueService.allVenues();

    ResponseHandler.ok(res, events);
  }
}
