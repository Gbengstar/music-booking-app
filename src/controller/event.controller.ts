import { validate } from './../helper/validator.helper';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { EventService } from '../service/event.service';
import {
  createEventValidator,
  updateEventStatusValidator,
  updateEventValidator,
} from '../validator/event.validator';
import { IRequest } from '../interface/request.interface';
import { objectIdValidator } from '../validator/common.validator';
import { ok } from 'assert';

@Service()
@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  async createEvent(req: IRequest, res: Response) {
    const eventData = await validate(createEventValidator, req.body);
    const newEvent = await this.eventService.createEvent(
      req.auth.id,
      eventData
    );

    ResponseHandler.created(res, newEvent);
  }

  async updateEventData(req: IRequest, res: Response) {
    const { id, ...eventData } = await validate(updateEventValidator, req.body);
    const updatedEvent = await this.eventService.updateEventData(id, eventData);

    ResponseHandler.created(res, updatedEvent);
  }

  async updateEventStatus(req: IRequest, res: Response) {
    const { status, id } = await validate(updateEventStatusValidator, {
      status: req.body.status,
      id: req.params.id,
    });

    const updatedEvent = await this.eventService.updateEventData(id, {
      status,
    });

    ResponseHandler.ok(res, updatedEvent);
  }

  async allEvents(req: Request, res: Response) {
    const events = await this.eventService.allEvents();

    ResponseHandler.ok(res, events);
  }

  async deleteEvent(req: Request, res: Response) {
    const { id } = await validate(objectIdValidator, {
      id: req.params.id,
    });
    await this.eventService.updateEventData(id, { deleted: true });

    ResponseHandler.ok(res, true);
  }
}
