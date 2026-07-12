import {
  addErrorInterceptor,
  addRejectErrorInterceptor,
  addSourceApplicationInterceptor,
  addWithCredentials,
} from './http.interceptors';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  configAvantiusLegacy,
  configAvantiusProxy,
  configDocumentacionIntegracionesProxy,
} from '@/shared/config';

import { ApiRequest } from './http.model';
import { getRequestData } from './http.utils';
import { useOrganoJudicialContextoStore } from '@/pages/shared/stores/organo-judicial-contexto.store';

export const httpClientFactory = (
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
};

export const httpClientSinTransform = httpClientFactory({
  transformResponse: [],
});

export const httpClient_wsClient = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  if (!config) config = { transformResponse: [] };
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  instance.interceptors.request.use((config) => {
    const organoContexto: number | null =
      useOrganoJudicialContextoStore.getState().idOrganoJudicialContexto;
    if (organoContexto)
      config.headers['IDOrganoJudicialContexto'] = organoContexto.toString();

    return config;
  });

  return instance;
})();

export const httpClient = httpClientFactory();

const httpClientDictumHandler = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.response.use(addErrorInterceptor);
  return instance;
})();

const httpClient_Proxy_SinToken = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsPsicosocial = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_integracionCDCJ = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsTramitador = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsCatalogoServicios = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();
const httpClient_wsServiciosWeb = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsSIRAJ2 = ((config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsIntegracionDICIREG = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsAvantius = ((config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_avantiusCliente = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

const httpClient_wsModuloArchivo = ((
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create(config);
  instance.interceptors.request.use(addSourceApplicationInterceptor);
  instance.interceptors.request.use(addWithCredentials);
  instance.interceptors.response.use(
    (response) => response,
    addRejectErrorInterceptor,
  );
  return instance;
})();

  export const httpClient_wsRecepcionEscritos = ((
    config?: AxiosRequestConfig,
  ): AxiosInstance => {
    const instance = axios.create(config);
    instance.interceptors.request.use(addSourceApplicationInterceptor);
    instance.interceptors.request.use(addWithCredentials);
    instance.interceptors.response.use(
      (response) => response,
      addRejectErrorInterceptor,
    );
    return instance;
  })();

export const fetchApiRequestAvantiusLegacy = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClientDictumHandler.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusLegacy.server.baseURL,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers
      ? request.headers
      : {
          'Content-Type': 'text/plain',
        },
    withCredentials: true,
  });

  return data;
};

export const fetchApiRequestAvantiusLegacyJSON = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClientDictumHandler.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusLegacy.server.baseURL,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers
      ? request.headers
      : {
          'Content-Type': 'application/json; charset=utf-8',
        },
    withCredentials: true,
  });

  return data;
};

export const fetchApiRequestProxySinToken = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_Proxy_SinToken.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.avantiusProxy,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_Proxy_SinToken.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsPsicosocial = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_wsPsicosocial.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsPsicosocial,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_wsPsicosocial.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestintegracionCDCJ = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_integracionCDCJ.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.integracionCDCJ,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_integracionCDCJ.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsTramitador = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_wsTramitador.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsTramitador,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...request.headers,
      ...httpClient_wsTramitador.defaults.headers.common,
    },
  });

  return data;
};
export const fetchApiRequestWsSIRAJ2 = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_wsSIRAJ2.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsSIRAJ2,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_wsSIRAJ2.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsIntegracionDICIREG = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_wsIntegracionDICIREG.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsIntegracionDICIREG,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...request.headers,
      ...httpClient_wsIntegracionDICIREG.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsSIRAJ2Documentos = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<{ blob: Blob; headers: Record<string, string> }> => {
  const headers: Record<string, string> = {};

  const response = await httpClient_wsSIRAJ2.request<Blob>({
    method: request.httpMethod,
    baseURL: configDocumentacionIntegracionesProxy.server.wsSIRAJ2,
    url: request.path,
    data: getRequestData(request),
    responseType: 'blob',
    headers: {
      ...headers,
      ...httpClient_wsSIRAJ2.defaults.headers.common,
    },
  });

  console.log('fetchApiRequestWsSIRAJ2Documentos: ', response);

  const contentDisposition = String(response.headers['content-disposition'] ?? '');
  const contentType = String(
    response.headers['content-type'] ?? 'application/octet-stream',
  );

  return {
    blob: response.data,
    headers: {
      'Content-Disposition': contentDisposition,
      'Content-Type': contentType,
    },
  };
};

export const fetchApiRequestWsCatalogoServicios = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_wsCatalogoServicios.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsCatalogoServicios,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_wsCatalogoServicios.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsAvantius = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_wsAvantius.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsAvantius,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_wsAvantius.defaults.headers.common,
    },
  });

  return data;
};
export const fetchApiRequestWsServiciosWeb = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_wsServiciosWeb.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsServiciosWeb,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...request.headers,
      ...httpClient_wsServiciosWeb.defaults.headers.common,
    },
  });

  return data;
};

export const fetchApiRequestWsServiciosWebJSON = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_wsServiciosWeb.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsServiciosWeb,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers ?? {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  return data;
};

export const fetchApiRequestAvantiusCliente = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_avantiusCliente.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.avantiusCliente,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers
      ? request.headers
      : {
          'Content-Type': 'text/plain',
        },
    withCredentials: true,
  });

  return data;
};

export const fetchApiRequestAvantiusClienteJSON = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_avantiusCliente.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.avantiusCliente,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers
      ? request.headers
      : {
          'Content-Type': 'application/json; charset=utf-8',
        },
    withCredentials: true,
  });

  return data;
};

export const fetchApiRequestWsImportadorServicios = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const { data } = await httpClient_avantiusCliente.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsImportador,
    url: request.path,
    params: request.params,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: request.headers
      ? request.headers
      : {
          'Content-Type': 'application/json; charset=utf-8',
        },
    withCredentials: true,
  });

  return data;
};


export const fetchApiRequestModuloArchivo = async <TRequest, TResponse>(
  request: ApiRequest<TRequest, TResponse>,
): Promise<TResponse> => {
  const headers: Record<string, string> = {};

  const { data } = await httpClient_wsModuloArchivo.request<TResponse>({
    method: request.httpMethod,
    baseURL: configAvantiusProxy.server.wsModuloArchivo,
    url: request.path,
    data: getRequestData(request),
    responseType: request.responseType,
    headers: {
      ...headers,
      ...httpClient_wsModuloArchivo.defaults.headers.common,
    },
  });

  return data;
};
