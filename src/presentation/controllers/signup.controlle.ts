import type { HttpRequest, HttpResponse } from "../protocols/http.protocol";

export class SignUpController {
  handle(
    httpRequest: HttpRequest<{ name: string; email: string }>,
  ): HttpResponse {
    if (!httpRequest.body?.name) {
      return {
        statusCode: 400,
        body: new Error("Missing param: name"),
      };
    }

    if (!httpRequest.body?.email) {
      return {
        statusCode: 400,
        body: new Error("Missing param: email"),
      };
    }
  }
}
