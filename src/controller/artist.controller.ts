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
}
