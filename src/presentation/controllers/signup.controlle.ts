import { MissingParamError } from "../errors/missing-param.error";
import type { HttpRequest, HttpResponse } from "../protocols/http.protocol";

export class SignUpController {
  handle(
    httpRequest: HttpRequest<{ name: string; email: string }>,
  ): HttpResponse {
    if (!httpRequest.body?.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      };
    }

    if (!httpRequest.body?.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email"),
      };
    }
  }
}
