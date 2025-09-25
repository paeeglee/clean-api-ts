import validator from "validator";
import { describe, expect, test, vi } from "vitest";

import { EmailValidatorAdapter } from "./email-validator";

vi.mock("validator", () => ({
  default: {
    isEmail(): boolean {
      return true;
    },
  },
}));

describe("EmailValidator Adapter", () => {
  test("should retun flase if validator returns false", () => {
    vi.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("should retun flase if validator returns true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });
});
