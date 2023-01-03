import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpeficication {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({ description, name }: ICreateSpeficication): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
