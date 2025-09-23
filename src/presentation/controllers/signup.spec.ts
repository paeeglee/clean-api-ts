import { describe, expect, test } from "vitest";
import { SignUpController } from "./signup.controlle";

describe("Signup Controller", () => {
  test("should return 400 if no name is provided", async () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });
});
