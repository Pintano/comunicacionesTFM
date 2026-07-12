import { createContext, useContext } from 'react';

export interface ModalContextProps {
  onClose: () => void;
  variant: 'default' | 'compact';
}

export const ModalContext = createContext<ModalContextProps>({
  onClose: () => {},
  variant: 'default',
});

export function useModalContext(): ModalContextProps {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      'useModalContext debe usarse dentro de un ModalContext.Provider',
    );
  }

  return context;
}
