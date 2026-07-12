import { HttpResponseErrorData } from './http.model';
import { StatusCodes } from 'http-status-codes';
import i18next from 'i18next';

export class HttpResponseError extends Error {
  constructor(
    public status: number,
    public data: HttpResponseErrorData,
    message?: string,
  ) {
    super(message ?? HttpResponseError.generateDefaultMessage(status, data));
  }

  public static generateDefaultMessage(
    status: number,
    data: HttpResponseErrorData,
  ) {
    if (status === StatusCodes.BAD_REQUEST) {
      return data.title;
    }

    if (status === StatusCodes.NOT_FOUND) {
      return i18next.t('shared.server.not-found');
    }

    if (status === StatusCodes.FORBIDDEN) {
      return i18next.t('shared.server.forbidden');
    }

    if (status === StatusCodes.BAD_GATEWAY) {
      return data.detail ?? i18next.t('share.server.bad-gateway');
    }

    if (status >= StatusCodes.INTERNAL_SERVER_ERROR) {
      return i18next.t('shared.server.internal-server-error');
    }
  }
}
