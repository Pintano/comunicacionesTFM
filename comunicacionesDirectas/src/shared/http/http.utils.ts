/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from './http.model';

const getFormData = (data: any): any => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((arrayValue) => formData?.append(key, arrayValue));
    } else if (value instanceof File) {
      formData?.append(key, value);
    } else {
      formData?.set(key, value as any);
    }
  });

  return formData;
};

export const getRequestData = <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): TRequest | FormData | undefined => {
  return request.formData ? getFormData(request.formData) : request.data;
};

export function stringToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatString(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}
