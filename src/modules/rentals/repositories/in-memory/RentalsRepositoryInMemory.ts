import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRental } from "@modules/rentals/interfaces/ICreateRental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }

  async create({ car_id, expected_return_date, user_id }: ICreateRental): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}
