export interface HttpResponse<T = unknown> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<T> {
  body?: T;
}
