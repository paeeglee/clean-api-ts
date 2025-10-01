import bcrypt from "bcrypt";
import { describe, expect, it, vi } from "vitest";
import { BcryptAdapter } from "./bcrypter-adapter";

const makeSut = (): BcryptAdapter => new BcryptAdapter(12);

vi.mock("bcrypt", () => ({
  default: {
    async hash(): Promise<string> {
      return new Promise((resolve) => resolve("hashed_value"));
    },
  },
}));

describe("Bcrypter Adapter", () => {
  it("should call bcrypt with correct value", async () => {
    const sut = makeSut();
    const hashSpy = vi.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });

  it("should return a hash on success", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hashed_value");
  });
});
