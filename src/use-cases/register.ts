/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserCase {
  constructor(private userReposity: UsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const password_hash = await hasdh(password, 6);
    const userWithSameEmail = await this.userReposity.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.userReposity.create({
      name,
      email,
      password_hash,
    });
  }
}
