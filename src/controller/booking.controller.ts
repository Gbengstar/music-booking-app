import { Service } from 'typedi';
import { Controller } from '../helper/controller-decorator.helper';
import { BookingService } from '../service/booking.service';

@Service()
@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
}
