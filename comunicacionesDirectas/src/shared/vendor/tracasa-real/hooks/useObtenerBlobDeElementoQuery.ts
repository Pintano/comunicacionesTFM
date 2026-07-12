import { useQuery } from '@tanstack/react-query';
import { DatosElementoAVisualizar } from '../components/visor/visor-utils';
import useFileHandler from './use-file-handler.hook';

export const useObtenerBlobDeElementoQuery = (
  elemento: DatosElementoAVisualizar,
  options?: { enabled: boolean },
) => {
  const { obtenerBlobDeElemento } = useFileHandler();
  const fetchBlob = async () => {
    const response = await obtenerBlobDeElemento(elemento);

    return URL.createObjectURL(response);
  };

  return useQuery({
    queryKey: ['obtenerBlobDeElemento'],
    queryFn: fetchBlob,
    enabled: options?.enabled,
  });
};
export default useObtenerBlobDeElementoQuery;
