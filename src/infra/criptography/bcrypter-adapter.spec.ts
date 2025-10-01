import bcrypt from "bcrypt";
import { describe, expect, it, vi } from "vitest";
import { BcryptAdapter } from "./bcrypter-adapter";

describe("Bcrypter Adapter", () => {
  it("should call bcrypt with correct value", async () => {
    const sut = new BcryptAdapter(12);
    const hashSpy = vi.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });
});
