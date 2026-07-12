import {
  AyudaSoporteHttpRepository,
  ObjetoCompartido,
} from '@/shared/repositories/ayuda-soporte';
import { ConfiguracionDespliegueHttpRepository } from '@/shared/repositories/configuracion-despliegue';

const repositorioAyudaSoporte = AyudaSoporteHttpRepository();
const repositorioConfiguracionDespliegue =
  ConfiguracionDespliegueHttpRepository();

const obtenerObjetoCompartido = (): ObjetoCompartido => {
  const ruta = '/' + window.location.hash.toLowerCase();
  const rawParametros = localStorage.getItem('parametrosSoporte');
  const parametros = rawParametros ? JSON.parse(rawParametros) : null;
  const urlParametrosSinSustituir = window.location.hash.slice(1);

  return {
    Ruta: ruta,
    parametros,
    urlParametrosSinSustituir,
  } as ObjetoCompartido;
};

export const guardarEnLocalObjetoCompartido = () => {
  const objetoCompartidoAyudaSoporte = obtenerObjetoCompartido();
  localStorage.setItem(
    'objetoCompartido',
    JSON.stringify(objetoCompartidoAyudaSoporte),
  );
};

export const verificarAcceso = async (): Promise<boolean> => {
  const objetoCompartidoAyudaSoporte = obtenerObjetoCompartido();

  const response = await repositorioAyudaSoporte.tieneAccesoAyudaSoporte(
    objetoCompartidoAyudaSoporte,
  );

  if (response.tieneAcceso) {
    return true;
  }

  const configResponse =
    await repositorioConfiguracionDespliegue.obtenerConfiguracionDespliegue({
      Variable: 'PermitirAbrirIncidencias',
    });

  return configResponse as boolean;
};
