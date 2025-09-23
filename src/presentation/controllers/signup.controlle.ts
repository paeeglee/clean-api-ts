import { MissingParamError } from "../errors/missing-param.error";
import { badRequest } from "../helpers/http.helper";
import type { HttpRequest, HttpResponse } from "../protocols/http.protocol";

export class SignUpController {
  handle(
    httpRequest: HttpRequest<{ name: string; email: string }>,
  ): HttpResponse {
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
  }
}
