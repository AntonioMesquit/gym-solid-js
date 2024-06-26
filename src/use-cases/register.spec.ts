import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUserCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserCase;
describe(" Register Use Case ", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserCase(usersRepository);
  });
  it("should hash user passoword upon registrataion", async () => {
    const { user } = await sut.execute({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    const isPasswordHashedCorrectly = await compare(
      "123456",
      user.password_hash,
    );
    expect(isPasswordHashedCorrectly).toBe(true);
  });

  it("should bot be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUserCase(usersRepository);
    const email = "johndoe@example.com";
    await sut.execute({
      name: "john doe",
      email,
      password: "123456",
    });

    expect(async () => {
      await sut.execute({
        name: "john doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUserCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
