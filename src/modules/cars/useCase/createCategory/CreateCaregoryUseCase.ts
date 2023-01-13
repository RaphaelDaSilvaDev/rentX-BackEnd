import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface RequestProps {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute({ description, name }: RequestProps) {
    const categoryAlreadExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadExists) {
      throw new AppError("This category already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
