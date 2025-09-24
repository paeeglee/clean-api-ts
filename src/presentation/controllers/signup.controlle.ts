import { InvalidParamError } from "../errors/invalid-param.error";
import { MissingParamError } from "../errors/missing-param.error";
import { badRequest, serverError } from "../helpers/http.helper";
import type { Controller } from "../protocols/controller.protocol";
import type { EmailValidator } from "../protocols/email-validator";
import type { HttpRequest, HttpResponse } from "../protocols/http.protocol";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(
    httpRequest: HttpRequest<{
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }>,
  ): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body?.[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch {
      return serverError();
    }
  }
}
