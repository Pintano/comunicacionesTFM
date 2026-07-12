import { axe } from 'vitest-axe';
import {
  renderWithLoadingProviderAndI18,
  renderWithRouterAndI18n,
} from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import ComunicacionesDirectasPage from './comunicaciones-directas.page';
import { ComunicacionesDirectasInMemory } from '@/shared/repositories/comunicaciones-directas';
import { Routes } from '@/shared/config/routing';
import { generatePath } from 'react-router-dom';
import { AvisosProvider } from '@/shared/providers/avisos-provider';

describe('ComunicacionesDirectasActivas', () => {
  const comunicacionesDirectasRepository = new ComunicacionesDirectasInMemory();
  it('se renderiza sin fallar', async () => {
    const paginaPrincipal = renderWithRouterAndI18n(
      <AvisosProvider>
        <ComunicacionesDirectasPage
          comunicacionesDirectasRepository={comunicacionesDirectasRepository}
        />
      </AvisosProvider>,
      [
        {
          element: <div></div>,
          path: generatePath(Routes.comunicacionesDirectas.absolutePath, {
            estadoComunicacion: 'activas',
          }),
        },
      ],
    );

    fireEvent.click(
      await screen.findByText(
        'Paginas.comunicacionesDirectas.comunicacionesActivas',
      ),
    );

    await waitFor(() => {
      expect(paginaPrincipal.router.routes[1].path).toBe(
        generatePath(Routes.comunicacionesDirectas.absolutePath, {
          estadoComunicacion: 'activas',
        }),
      );
    });
  });
});

describe('ComunicacionesDirectasArchivadas', () => {
  const comunicacionesDirectasRepository = new ComunicacionesDirectasInMemory();
  it('se renderiza sin fallar', async () => {
    const paginaPrincipal = renderWithRouterAndI18n(
      <AvisosProvider>
        <ComunicacionesDirectasPage
          comunicacionesDirectasRepository={comunicacionesDirectasRepository}
        />
      </AvisosProvider>,
      [
        {
          element: <div></div>,
          path: generatePath(Routes.comunicacionesDirectas.absolutePath, {
            estadoComunicacion: 'archivadas',
          }),
        },
      ],
    );

    fireEvent.click(
      await screen.findByText(
        'paginas.comunicacionesDirectas.comunicacionesArchivadas',
      ),
    );

    await waitFor(() => {
      expect(paginaPrincipal.router.routes[1].path).toBe(
        generatePath(Routes.comunicacionesDirectas.absolutePath, {
          estadoComunicacion: 'archivadas',
        }),
      );
    });
  });
});

it('es accesible', async () => {
  const comunicacionesDirectasRepository = new ComunicacionesDirectasInMemory();
  const { container } = await renderWithLoadingProviderAndI18(
    <ComunicacionesDirectasPage
      comunicacionesDirectasRepository={comunicacionesDirectasRepository}
    />,
  );
  const results = await axe(container);
  if (results.violations.length > 0) console.log(results.violations);
  expect(results.violations.length).toBe(0);
});
