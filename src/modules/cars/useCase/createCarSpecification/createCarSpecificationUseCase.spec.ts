import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRespositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRespositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car Specification", () => {
  beforeEach(() => {
    carRespositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRespositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to an non existent car", async () => {
    expect(async () => {
      const car_id = "1324";
      const specification_id = ["54321"];
      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRespositoryInMemory.create({
      brand: "Brand Car",
      category_id: "Category Car",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "Plate Car",
      name: "Name Car 2",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Specification Description",
      name: "Specification Name",
    });

    const specification_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
