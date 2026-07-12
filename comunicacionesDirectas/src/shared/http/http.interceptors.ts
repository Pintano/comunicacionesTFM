/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const addErrorInterceptor = (
  response: AxiosResponse<any, any>,
): AxiosResponse => {
  return response;
};

export const addRejectErrorInterceptor = (
  error: AxiosError,
): Promise<AxiosResponse> => Promise.reject(error);

export const addWithCredentials = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  config.withCredentials = true;
  return config;
};

export const addSourceApplicationInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  config.headers!['sourceApplication'] = 'Avantius';

  return config;
};
