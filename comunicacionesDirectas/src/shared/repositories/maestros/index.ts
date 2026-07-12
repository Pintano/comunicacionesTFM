import { configAvantiusProxy } from '@/shared/config';
import { httpClientSinTransform } from '@/shared/http';
import {
  IMaestrosClient,
  MaestrosClient,
  ObtenerConfiguracionBaseExplorador_ResponseDTO,
  ObtenerMenusExploradorResponseVM,
} from '@/shared/repositories/autogenerado/wsAvantiusClient';

export interface IMaestrosHttpRepository {
  obtenerMenusExploradorPorOrganoYUsuario(): Promise<ObtenerMenusExploradorResponseVM>;
  obtenerConfiguracionBaseExplorador(): Promise<ObtenerConfiguracionBaseExplorador_ResponseDTO>;
}

class MaestrosHttpRepositoryImpl implements IMaestrosHttpRepository {
  private readonly cliente: IMaestrosClient = new MaestrosClient(
    configAvantiusProxy.server.wsAvantius.replace('/api', ''),
    httpClientSinTransform,
  );

  obtenerMenusExploradorPorOrganoYUsuario(): Promise<ObtenerMenusExploradorResponseVM> {
    return this.cliente.obtenerMenusExploradorPorOrganoYUsuario();
  }

  obtenerConfiguracionBaseExplorador(): Promise<ObtenerConfiguracionBaseExplorador_ResponseDTO> {
    return this.cliente.obtenerConfiguracionBaseExplorador();
  }
}

export const MaestrosHttpRepository = () => new MaestrosHttpRepositoryImpl();