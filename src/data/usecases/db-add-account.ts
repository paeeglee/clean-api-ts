import type { AccountModel } from "../../domain/models/account";
import type {
  AddAccount,
  AddAccountModel,
} from "../../domain/usecases/add-account";
import type { AddAccountRepository } from "../protocols/add-account-repository.protocol";
import type { Encrypter } from "../protocols/encrypter.protocol";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
