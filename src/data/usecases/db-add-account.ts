import type { AccountModel } from "../../domain/models/account";
import type {
  AddAccount,
  AddAccountModel,
} from "../../domain/usecases/add-account";
import type { Encrypter } from "../protocols/encrypter.protocol";

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve({} as AccountModel));
  }
}
