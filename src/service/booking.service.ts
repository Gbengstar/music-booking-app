import { Service } from 'typedi';
import { BookingModel } from '../model/booking.model';
import { CacheService } from './cache.service';
import { IBooking } from '../interface/booking.interface';
import { RaceLocker } from './race-locker.service';
import { EventService } from './event.service';
import { FilterQuery } from 'mongoose';
import { CustomError } from '../helper/error.helper';
import { HttpStatusCode } from '../enum/http-status.enum';
import { EventStatusEnum } from '../enum/event.enum';

@Service()
export class BookingService {
  private readonly cacheKey = 'booking-service-cache-key';
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
      // get event
      const event = await this.eventService.findOneOrFail({
        _id: bookingData.event,
      });

      if (event.status !== EventStatusEnum.PUBLISHED) {
        throw new CustomError(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          'Event not ready to be booked'
        );
      }

      // Check ticket availability
      if (event.availableTickets < bookingData.tickets) {
        throw new CustomError(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          'Not enough tickets available'
        );
      }

      // Calculate total amount
      const totalAmount = +(event.ticketPrice * bookingData.tickets).toFixed(2);

      // Create booking
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

  filterBookings(filter: FilterQuery<IBooking>) {
    const key = this.cacheKey + JSON.stringify(filter);
    return this.cacheService.getOrLoad(key, async () => {
      return BookingModel.find(filter).populate('user event');
    });
  }
}
