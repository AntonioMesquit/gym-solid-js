import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe(" Get User Profile Use Case ", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository); // system under test
  });
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("john doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(async () => {
      await sut.execute({
        userId: "non-exists-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
