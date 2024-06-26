/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUserCase {
  constructor(private userReposity: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.userReposity.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userReposity.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}
