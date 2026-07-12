import { ResponseType } from 'axios';

export type ApiRequest<TRequest, _TResponse> = {
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  data?: TRequest;
  formData?: TRequest;
  params?: Record<string, string | number | boolean>;
  responseType?: ResponseType;
  headers?: Record<string, string>;
};

export type HttpResponseErrorData = {
  title?: string;
  detail?: string;
  errors: Record<string, string[]>;
};
