import { validate } from './../helper/validator.helper';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { EventService } from '../service/event.service';
import { createEventValidator } from '../validator/event.validator';

@Service()
@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  async createEvent(req: Request, res: Response) {
    const eventData = await validate(createEventValidator, req.body);
    const newEvent = await this.eventService.createEvent(eventData);

    ResponseHandler.created(res, newEvent);
  }

  async allEvents(req: Request, res: Response) {
    const events = await this.eventService.allEvents();

    ResponseHandler.ok(res, events);
  }
}
