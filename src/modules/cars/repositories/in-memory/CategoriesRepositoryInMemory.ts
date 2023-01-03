import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateCategory } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async create({ description, name }: ICreateCategory) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const categories = this.categories;
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
