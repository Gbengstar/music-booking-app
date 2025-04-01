import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { BookingService } from '../service/booking.service';
import { IRequest } from '../interface/request.interface';
import { Response } from 'express';
import { ResponseHandler } from '../helper/response.helper';
import { validate } from '../helper/validator.helper';
import {
  createBookingValidator,
  filterBookingValidator,
} from '../validator/booking.validator';

@Service()
@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  async allBookings(req: IRequest, res: Response) {
    const bookings = await this.bookingService.allBookings();

    ResponseHandler.ok(res, bookings);
  }

  async createBooking(req: IRequest, res: Response) {
    const bookingData = await validate(createBookingValidator, req.body);
    const booking = await this.bookingService.createBooking(
      req.auth.id,
      bookingData
    );

    ResponseHandler.ok(res, booking);
  }

  async myBookings(req: IRequest, res: Response) {
    const filter = await validate(filterBookingValidator, req.query);

    const bookings = await this.bookingService.filterBookings({
      user: req.auth.id,
      ...filter,
    });

    ResponseHandler.ok(res, bookings);
  }
}
