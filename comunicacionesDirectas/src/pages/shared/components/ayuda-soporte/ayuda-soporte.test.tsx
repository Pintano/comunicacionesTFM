// @vitest-environment-options { "isolate": true }

import { vi } from 'vitest';

vi.mock(
  '@/shared/repositories/ayuda-soporte/ayuda-soporte.http.repository',
  () => ({
    AyudaSoporteHttpRepository: () => ({
      tieneAccesoAyudaSoporte: vi.fn().mockResolvedValue({ tieneAcceso: true }),
    }),
  }),
);

vi.mock('@/shared/repositories/configuracion-despliegue', () => ({
  ConfiguracionDespliegueHttpRepository: () => ({
    obtenerConfiguracionDespliegue: vi.fn().mockResolvedValue(true),
  }),
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AyudaSoporte } from './ayuda-soporte';

describe('AyudaSoporte', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('se renderiza sin fallar', () => {
    render(<AyudaSoporte />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('muestra el botón de ayuda cuando tiene acceso', async () => {
    render(<AyudaSoporte />);
    await waitFor(() => expect(screen.getByRole('button')).toBeVisible());
  });

  it('guarda el objeto compartido en localStorage al hacer clic', async () => {
    render(<AyudaSoporte />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const objetoCompartido = JSON.parse(
        localStorage.getItem('objetoCompartido') || '{}',
      );
      expect(objetoCompartido).toHaveProperty('Ruta');
      expect(objetoCompartido).toHaveProperty('parametros');
      expect(objetoCompartido).toHaveProperty('urlParametrosSinSustituir');
    });
  });
});
