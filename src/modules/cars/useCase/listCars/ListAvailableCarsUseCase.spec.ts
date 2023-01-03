import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCatsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemorory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemorory = new CarsRepositoryInMemory();
  listCatsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemorory);
});

describe("List Cars", () => {
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemorory.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 70,
      license_plate: "abc-4321",
      name: "Car1",
    });

    const cars = await listCatsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemorory.create({
      brand: "Car_brand_test",
      category_id: "category_id",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 70,
      license_plate: "abc-4321",
      name: "Car1",
    });

    const cars = await listCatsUseCase.execute({
      name: "Car1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemorory.create({
      brand: "Car_brand_test",
      category_id: "category_id",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 70,
      license_plate: "abc-4321",
      name: "Car1",
    });

    const cars = await listCatsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemorory.create({
      brand: "Car_brand_test",
      category_id: "category_id",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 70,
      license_plate: "abc-4321",
      name: "Car1",
    });

    const cars = await listCatsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
