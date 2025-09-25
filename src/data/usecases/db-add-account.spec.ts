import { describe, expect, test, vi } from "vitest";
import type { AddAccount } from "../../domain/usecases/add-account";
import type { Encrypter } from "../protocols/encrypter.protocol";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: AddAccount;
  encrypterStub: Encrypter;
}

const makeSut = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);

  return { sut, encrypterStub };
};

describe("Email Validator Adapter", () => {
  test("should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = vi.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);
    expect(encrypterSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    vi.spyOn(encrypterStub, "encrypt").mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error())),
    );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
