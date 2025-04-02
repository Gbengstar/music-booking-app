import { Service } from 'typedi';
import { BookingModel } from '../model/booking.model';
import { CacheService } from './cache.service';
import { IBooking } from '../interface/booking.interface';
import { RaceLocker } from './race-locker.service';
import { EventService } from './event.service';
import { FilterQuery, PopulateOptions } from 'mongoose';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';
import { EventStatusEnum } from '../enum/event.enum';
import { BookingStatusEnum } from '../enum/booking.enum';

@Service()
export class BookingService {
  private readonly cacheKey = 'booking-service-cache-key';
  private readonly populateData: PopulateOptions[] = [
    { path: 'user' },
    {
      path: 'event',
      populate: [{ path: 'artists', foreignField: 'user' }, { path: 'venue' }],
    },
  ];
  constructor(
    private readonly cacheService: CacheService,
    private readonly raceLocker: RaceLocker,
    private readonly eventService: EventService
  ) {}

  allBookings() {
    return this.cacheService.getOrLoad(this.cacheKey, async () => {
      return BookingModel.find();
    });
  }

  async createBooking(user: string, bookingData: IBooking) {
    const bookTickets = async () => {
      const event = await this.eventService.findOneOrFail({
        _id: bookingData.event,
        deleted: false,
      });

      if (event.status !== EventStatusEnum.PUBLISHED) {
        throw new CustomError(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          'Event not ready to be booked'
        );
      }

      if (event.availableTickets < bookingData.tickets) {
        throw new CustomError(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          'Not enough tickets available'
        );
      }

      const totalAmount = +(event.ticketPrice * bookingData.tickets).toFixed(2);

      const booking = new BookingModel({
        ...bookingData,
        totalAmount,
        user,
      });

      event.availableTickets -= bookingData.tickets;

      if (!event.availableTickets) {
        event.status = EventStatusEnum.COMPLETED;
      }

      const [newBooking] = await Promise.all([
        booking.save(),
        event.save(),
        this.cacheService.delete(this.cacheKey),
      ]);

      return newBooking;
    };

    return this.raceLocker.lockAndExecute(this.cacheKey + 'lock', bookTickets);
  }

  async cancelBooking(user: string, bookingId: string) {
    const booking = await BookingModel.findOne({
      _id: bookingId,
      user,
      status: { $ne: BookingStatusEnum.CANCELLED },
    });
    if (!booking) {
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        'No active booking found for user'
      );
    }

    const event = await this.eventService.findOneOrFail({
      _id: booking.event,
      deleted: false,
    });

    event.availableTickets += booking.tickets;

    booking.status = BookingStatusEnum.CANCELLED;
    event.status = EventStatusEnum.PUBLISHED;

    const [cancelledBooking] = await Promise.all([
      booking.save(),
      event.save(),
    ]);

    return cancelledBooking;
  }

  filterBookings(filter: FilterQuery<IBooking>) {
    const key = this.cacheKey + JSON.stringify(filter);
    return this.cacheService.getOrLoad(key, async () => {
      return BookingModel.find(filter).populate(this.populateData);
    });
  }
}
