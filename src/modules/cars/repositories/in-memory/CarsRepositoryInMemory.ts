import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCar } from "@modules/cars/interfaces/ICreateCar";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCar): Promise<Car> {
    const cars = new Car();

    Object.assign(cars, data);

    this.cars.push(cars);

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === id);
    return car;
  }
}
