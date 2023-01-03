import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      brand: "Brand Car",
      category_id: "Category Car",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "Plate Car",
      name: "Name Car",
    });
  });

  it("should be not able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Brand Car",
        category_id: "Category Car",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "Plate Car",
        name: "Name Car 1",
      });

      await createCarUseCase.execute({
        brand: "Brand Car",
        category_id: "Category Car",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "Plate Car",
        name: "Name Car 2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand Car",
      category_id: "Category Car",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "Plate Car",
      name: "Name Car Available",
    });

    expect(car.available).toBe(true);
  });
});
