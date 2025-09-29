import { describe, expect, test, vi } from "vitest";
import type { AccountModel } from "../../domain/models/account";
import type {
  AddAccount,
  AddAccountModel,
} from "../../domain/usecases/add-account";
import type { AddAccountRepository } from "../protocols/add-account-repository.protocol";
import type { Encrypter } from "../protocols/encrypter.protocol";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: AddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password",
      };
      return new Promise((resolve) => resolve(fakeAccount as AccountModel));
    }
  }

  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  const encrypterStub = new EncrypterStub();
  const addAccountRepositoryStub = new AddAccountRepositoryStub();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return { sut, encrypterStub, addAccountRepositoryStub };
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

  test("should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addAccountSpy = vi.spyOn(addAccountRepositoryStub, "add");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);
    expect(addAccountSpy).toHaveBeenCalledWith({
      ...accountData,
      password: "hashed_password",
    });
  });

  test("should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    vi.spyOn(addAccountRepositoryStub, "add").mockReturnValueOnce(
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
