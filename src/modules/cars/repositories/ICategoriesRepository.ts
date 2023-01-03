import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  create({ description, name }: ICreateCategory);

  list(): Promise<Category[]>;

  findByName(name: string): Promise<Category>;
}
