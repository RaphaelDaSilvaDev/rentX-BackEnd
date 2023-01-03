import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCar } from "../interfaces/ICreateCar";

export interface ICarsRepository {
  create(data: ICreateCar): Promise<Car>;
  listAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
}
