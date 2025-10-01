import bcrypt from "bcrypt";
import type { Encrypter } from "../../data/protocols/encrypter.protocol";

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number = 12) {}

  async encrypt(_value: string): Promise<string> {
    return await bcrypt.hash(_value, this.salt);
  }
}
