import { Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { ResponseHandler } from '../helper/response.helper';
import { ArtistService } from '../service/artist.service';
import {
  artistAvailabilityValidator,
  createArtistProfileValidator,
  updateArtistProfileValidator,
} from '../validator/artist.validator';
import { validate } from '../helper/validator.helper';
import { IRequest } from '../interface/request.interface';
import { objectIdValidator } from '../validator/custom.validator';

@Service()
@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

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

  async addAvailability(req: IRequest, res: Response) {
    const availableTimes = await validate(
      artistAvailabilityValidator,
      req.body
    );

    const profile = await this.artistService.addAvailableTime(
      req.auth.id,
      availableTimes.availability
    );

    ResponseHandler.created(res, profile.availability);
  }

  async removeAvailability(req: IRequest, res: Response) {
    const idObj = await validate(objectIdValidator, req.params);

    const profile = await this.artistService.removeAvailableTime(
      req.auth.id,
      idObj.id
    );

    ResponseHandler.created(res, profile.availability);
  }
}
