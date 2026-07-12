import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { ArbolRelacionados } from './arbol-relacionados';
import type { GrupoExpedientes } from './arbol-relacionados';
import { axe } from 'vitest-axe';

vi.mock('../icon-wrapper/icon-wrapper', () => ({
  IconWrapper: ({ icono }: { icono: string }) => (
    <span data-testid={`icon-${icono}`} />
  ),
}));

describe('ArbolRelacionados', () => {
  let mockOnClick: ReturnType<typeof vi.fn>;
  let mockExpedientesOrgano: GrupoExpedientes[];

  beforeEach(() => {
    mockOnClick = vi.fn();
    mockExpedientesOrgano = [
      {
        id: 1,
        nombreOrgano: 'Juzgado 1',
        expedientes: [
          {
            titulo: 'EXP001',
            descripcionExpedienteArbol: 'Expediente 1',
            idObjetoEncriptado: 'idObjetoEncriptado',
            activo: true,
            sinPermiso: false,
            onClick: mockOnClick,
            subExpedientes: [
              {
                titulo: 'SUBEXP001',
                descripcionExpedienteArbol: 'Subexpediente 1',
                idObjetoEncriptado: 'idObjetoEncriptado',
                activo: false,
                sinPermiso: true,
                onClick: mockOnClick,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        nombreOrgano: 'Juzgado 2',
        expedientes: [
          {
            titulo: 'EXP002',
            descripcionExpedienteArbol: 'Expediente 2',
            idObjetoEncriptado: 'idObjetoEncriptado',
            activo: false,
            sinPermiso: false,
            onClick: mockOnClick,
          },
        ],
      },
    ];
  });

  it('renderiza correctamente la lista de órganos judiciales', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    expect(screen.getByText('Juzgado 1')).toBeInTheDocument();
    expect(screen.getByText('Juzgado 2')).toBeInTheDocument();
  });

  it('es accesible', async () => {
    const { container } = await render(
      <ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />,
    );
    const results = await axe(container);
    if (results.violations.length > 0) console.log(results.violations);
    expect(results.violations.length).toBe(0);
  });

  it('muestra los expedientes de cada órgano judicial', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    expect(screen.getByText('EXP001')).toBeInTheDocument();
    expect(screen.getByText('EXP002')).toBeInTheDocument();
  });

  it('renderiza los subexpedientes correctamente', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    expect(screen.getByText('SUBEXP001')).toBeInTheDocument();
  });

  it('llama a la función onClick al hacer clic en un expediente', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    const expediente = screen.getByText('EXP001');
    fireEvent.click(expediente);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('llama a la función onClick al presionar Enter en un expediente', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    const expediente = screen.getByText('EXP001');
    fireEvent.keyDown(expediente, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('llama a la función onClick al presionar la barra espaciadora en un expediente', () => {
    render(<ArbolRelacionados expedientesOrgano={mockExpedientesOrgano} />);

    const expediente = screen.getByText('EXP001');
    fireEvent.keyDown(expediente, { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
