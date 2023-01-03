import { IUsersRepository } from "../IUsersRepository";
import { ICreateUser } from "@modules/accounts/interfaces/ICreateUser";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

export class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  create({ driver_license, email, name, password }: ICreateUser) {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
}
