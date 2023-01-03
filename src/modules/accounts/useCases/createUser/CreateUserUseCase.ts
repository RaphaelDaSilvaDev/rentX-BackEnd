import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUser } from "@modules/accounts/interfaces/ICreateUser";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ driver_license, email, name, password }: ICreateUser) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("Email already exists!");
    }

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}
