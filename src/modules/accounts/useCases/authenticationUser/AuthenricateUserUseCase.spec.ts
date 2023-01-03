import "reflect-metadata";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryImMemory";
import { ICreateUser } from "@modules/accounts/interfaces/ICreateUser";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRespositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  usersRespositoryInMemory = new UserRepositoryInMemory();
  authenticateUserUseCase = new AuthenticateUserUseCase(usersRespositoryInMemory);
  createUserUseCase = new CreateUserUseCase(usersRespositoryInMemory);

  it("should be able to authenticate an user", async () => {
    const user: ICreateUser = {
      driver_license: "000123",
      email: "user@test.com",
      name: "User Test",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticated an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1324",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to athenticated with incorrect password", () => {
    expect(async () => {
      const user: ICreateUser = {
        driver_license: "000123",
        email: "user@test.com",
        name: "User Test",
        password: "1234",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({ email: user.email, password: "invalidPassword" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
