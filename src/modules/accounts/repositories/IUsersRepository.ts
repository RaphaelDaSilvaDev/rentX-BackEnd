import { User } from "../infra/typeorm/entities/User";
import { ICreateUser } from "../interfaces/ICreateUser";

export interface IUsersRepository {
  create(data: ICreateUser);

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
