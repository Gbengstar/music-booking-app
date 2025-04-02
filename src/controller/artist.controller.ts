import { Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { ArtistService } from '../service/artist.service';
import {
  createArtistProfileValidator,
  updateArtistProfileValidator,
} from '../validator/artist.validator';
import { validate } from '../helper/validator.helper';
import { IRequest } from '../interface/request.interface';
import { EventService } from '../service/event.service';
import { objectIdValidator } from '../validator/common.validator';

@Service()
@Controller()
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly eventService: EventService
  ) {}

  async getProfile(req: IRequest, res: Response) {
    const profile = await this.artistService.getProfile(req.auth.id);

    ResponseHandler.ok(res, profile);
  }

  async createProfile(req: IRequest, res: Response) {
    const userData = await validate(createArtistProfileValidator, {
      ...req.body,
      user: req.auth.id,
    });

    const profile = await this.artistService.createProfile(userData);

    ResponseHandler.created(res, profile);
  }

  async updateProfile(req: IRequest, res: Response) {
    const artistData = await validate(updateArtistProfileValidator, req.body);

    const profile = await this.artistService.updateProfile(
      req.auth.id,
      artistData
    );

    ResponseHandler.ok(res, profile);
  }

  async getArtistEvents(req: IRequest, res: Response) {
    const { id } = await validate(objectIdValidator, { id: req.params.id });

    const profile = await this.eventService.allEvents({
      artists: { $in: [id] },
    });

    ResponseHandler.ok(res, profile);
  }
}
