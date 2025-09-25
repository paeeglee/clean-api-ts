import validator from "validator";
import { describe, expect, test, vi } from "vitest";

import { EmailValidatorAdapter } from "./email-validator-adapter";

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

  test("should retun false if validator returns true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("should call validator with correct email", () => {
    const isEmailSpy = vi.spyOn(validator, "isEmail");
    const sut = new EmailValidatorAdapter();
    sut.isValid("valid_email@mail.com");

    expect(isEmailSpy).toHaveBeenCalledWith("valid_email@mail.com");
  });
});
