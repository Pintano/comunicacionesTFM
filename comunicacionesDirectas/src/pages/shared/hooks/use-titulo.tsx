import { useAppStore } from '@/shared/zustand/store';
import { useEffect } from 'react';

export const useTitulo = (titulo: string) => {
  const setTitulo = useAppStore((state) => state.setTitulo);

  useEffect(() => {
    setTitulo(titulo);
  }, [setTitulo, titulo]);
};
