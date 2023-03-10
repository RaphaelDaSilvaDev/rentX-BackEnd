import { ICreateRental } from "@modules/rentals/interfaces/ICreateRental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id });
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id });
  }

  async create({ car_id, expected_return_date, user_id }: ICreateRental): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.repository.save(rental);
    return rental;
  }
}
