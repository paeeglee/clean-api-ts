import { MissingParamError } from "../errors/missing-param.error";
import { badRequest } from "../helpers/http.helper";
import type { HttpRequest, HttpResponse } from "../protocols/http.protocol";

export class SignUpController {
  handle(
    httpRequest: HttpRequest<{ name: string; email: string }>,
  ): HttpResponse {
    if (!httpRequest.body?.name) {
      return badRequest(new MissingParamError("name"));
    }

    if (!httpRequest.body?.email) {
      return badRequest(new MissingParamError("email"));
    }
  }
}
