import { Rental } from "../infra/typeorm/entities/Rental";
import { ICreateRental } from "../interfaces/ICreateRental";

export interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  create(data: ICreateRental): Promise<Rental>;
}
