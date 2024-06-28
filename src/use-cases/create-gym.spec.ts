import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUserCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUserCase;
describe(" Create Gym Use Case ", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUserCase(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      latitude: -3.8119548,
      description: null,
      phone: null,
      longitude: -38.6045009,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
