import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserCase } from "../register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUserCase(prismaUsersRepository);
  return registerUseCase;
}
