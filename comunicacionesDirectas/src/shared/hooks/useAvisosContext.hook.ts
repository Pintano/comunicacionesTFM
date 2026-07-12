import { useContext } from 'react';
import { AvisosContext, type AvisosContextType } from '@/shared/providers/avisos-provider';

export const useAvisosContext = (): AvisosContextType => {
  const context = useContext(AvisosContext);
  if (!context) {
    throw new Error('useAvisosContext must be used within an AvisosProvider');
  }
  return context;
};
