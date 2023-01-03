import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpeficication, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({ description, name }: ICreateSpeficication): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecifications;
  }
}
