import { createContext, useState, type ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { AvisoProps } from 'tracasa-components';

export interface AvisosContextType {
  aviso: AvisoProps | undefined;
  setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
}

export const AvisosContext = createContext<AvisosContextType | undefined>(undefined);

interface AvisosProviderProps {
  children: ReactNode;
}

export const AvisosProvider = ({ children }: AvisosProviderProps) => {
  const [aviso, setAviso] = useState<AvisoProps | undefined>(undefined);

  return <AvisosContext.Provider value={{ aviso, setAviso }}>{children}</AvisosContext.Provider>;
};
