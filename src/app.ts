import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
export const app = fastify();
const prisma = new PrismaClient();
prisma.user.create({
  data: {
    name: "Antonio Mesquita",
    email: "antonio109mesquita@gmail.com",
  },
});
