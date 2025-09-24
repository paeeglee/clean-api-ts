import type { AccountModel } from "../models/add-account";

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(_account: AddAccountModel): Promise<AccountModel>;
}
