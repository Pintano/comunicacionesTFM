import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';
import { axe } from 'vitest-axe';
import { useRef } from 'react';
import React from 'react';
import { vi } from 'vitest';

const parentId = 'padre';
const id = 'componente';

it('renderiza el componente checkbox', () => {
  render(
    <Checkbox id={id} parentId={parentId} textoAccesibilidad={'prueba'} />,
  );
  const checkbox = screen.getByTestId(`checkbox-${parentId}-${id}`);
  expect(checkbox).toBeInTheDocument();
  expect((checkbox as HTMLInputElement).type).toBe('checkbox');
});

it('es accesible', async () => {
  const { container } = render(<Checkbox id={id} textoAccesibilidad="." />);

  const results = await axe(container);
  if (results.violations.length > 0)
    results.violations.forEach((violation) => {
      console.log(`Rule ID: ${violation.id}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Description: ${violation.description}`);
      console.log(`Help: ${violation.help}`);
      console.log(`Help URL: ${violation.helpUrl}`);
      console.log('Affected nodes:');
      violation.nodes.forEach((node) => {
        console.log(`  Target: ${node.target.join(', ')}`);
        console.log(`  HTML: ${node.html}`);
        console.log(`  Failure Summary: ${node.failureSummary}`);
      });
    });

  expect(results.violations.length).toBe(0);
});

it('permite al usuario marcar y desmarcar', async () => {
  const { container } = render(<Checkbox id={id} textoAccesibilidad="." />);

  const checkbox = container.querySelector('input[type="checkbox"]');

  await userEvent.click(checkbox!);
  expect((checkbox as HTMLInputElement).checked).toBe(true);

  await userEvent.click(checkbox!);
  expect((checkbox as HTMLInputElement).checked).toBe(false);
});

it('no permite al usuario marcar al tener estado ReadOnly', async () => {
  const { container } = render(
    <Checkbox id={id} readOnly textoAccesibilidad="." />,
  );
  const checkbox = container.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;

  expect((checkbox as HTMLInputElement).checked).toBe(false);
  await userEvent.click(checkbox);
  await waitFor(() => {
    expect((checkbox as HTMLInputElement).checked).toBe(false);
  });
});

it('no permite al usuario desmarcar al tener estado ReadOnly', async () => {
  const { container } = render(
    <Checkbox id={id} readOnly={true} checked={true} textoAccesibilidad="." />,
  );
  const checkbox = container.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;

  expect(checkbox.checked).toBe(true);
  await userEvent.click(checkbox);
  await waitFor(() => {
    expect(checkbox.checked).toBe(true);
  });
});

it('no permite al usuario marcar al tener estado Disabled', async () => {
  const { container } = render(
    <Checkbox id={id} disabled={true} textoAccesibilidad="." />,
  );
  const checkbox = container.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;

  await userEvent.click(checkbox);
  await waitFor(() => {
    expect(checkbox.checked).toBe(false);
  });
});

it('no permite al usuario desmarcar al tener estado Disabled', async () => {
  const { container } = render(
    <Checkbox id={id} disabled={true} checked={true} textoAccesibilidad="." />,
  );
  const checkbox = container.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;

  await userEvent.click(checkbox);
  await waitFor(() => {
    expect(checkbox.checked).toBe(true);
  });
});

describe('Tamaños del checkbox', () => {
  it('renderiza checkbox pequeño correctamente', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        checkboxSize="small"
        textoAccesibilidad="Checkbox pequeño"
      />,
    );
    const checkbox = screen.getByTestId(`checkbox-${parentId}-${id}`);
    expect(checkbox).toBeInTheDocument();
  });

  it('renderiza checkbox mediano correctamente', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        checkboxSize="medium"
        textoAccesibilidad="Checkbox mediano"
      />,
    );
    const checkbox = screen.getByTestId(`checkbox-${parentId}-${id}`);
    expect(checkbox).toBeInTheDocument();
  });

  it('renderiza checkbox grande correctamente', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        checkboxSize="large"
        textoAccesibilidad="Checkbox grande"
      />,
    );
    const checkbox = screen.getByTestId(`checkbox-${parentId}-${id}`);
    expect(checkbox).toBeInTheDocument();
  });
});

describe('Texto del checkbox', () => {
  it('renderiza sin texto cuando no se proporciona', () => {
    render(<Checkbox id={id} textoAccesibilidad="Sin texto" />);
    const textElement = screen.queryByText(/texto/i);
    expect(textElement).not.toBeInTheDocument();
  });

  it('renderiza con texto cuando se proporciona', () => {
    const textoEsperado = 'Acepto los términos y condiciones';
    render(
      <Checkbox id={id} texto={textoEsperado} textoAccesibilidad="Con texto" />,
    );
    const textElement = screen.getByText(textoEsperado);
    expect(textElement).toBeInTheDocument();
  });
});

describe('Estado indeterminate', () => {
  it('renderiza en estado indeterminate correctamente', () => {
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        indeterminate={true}
        textoAccesibilidad="Indeterminate"
      />,
    );
    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('cambia de indeterminate a checked cuando se hace click', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        indeterminate={true}
        onChange={mockOnChange}
        textoAccesibilidad="Indeterminate to checked"
      />,
    );

    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    await userEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('no permite cambiar estado indeterminate cuando está disabled', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        indeterminate={true}
        disabled={true}
        onChange={mockOnChange}
        textoAccesibilidad="Indeterminate disabled"
      />,
    );

    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    await userEvent.click(checkbox);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

describe('Estado de error', () => {
  it('aplica estilos de error correctamente', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        error={true}
        textoAccesibilidad="Error state"
      />,
    );
    const checkbox = screen.getByTestId(`checkbox-${parentId}-${id}`);
    expect(checkbox).toBeInTheDocument();
  });

  it('combina error con checked correctamente', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        error={true}
        checked={true}
        textoAccesibilidad="Error checked"
      />,
    );
    const checkbox = screen.getByTestId(
      `checkbox-${parentId}-${id}`,
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});

describe('Manejo de eventos', () => {
  it('llama a onChange cuando cambia el estado', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        onChange={mockOnChange}
        textoAccesibilidad="OnChange test"
      />,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    await userEvent.click(checkbox!);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('no llama a onChange cuando está disabled', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        disabled={true}
        onChange={mockOnChange}
        textoAccesibilidad="Disabled onChange"
      />,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    await userEvent.click(checkbox!);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('no llama a onChange cuando está readOnly', async () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <Checkbox
        id={id}
        parentId={parentId}
        readOnly={true}
        onChange={mockOnChange}
        textoAccesibilidad="ReadOnly onChange"
      />,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    await userEvent.click(checkbox!);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

describe('Props controlados', () => {
  it('actualiza checked cuando cambia la prop', async () => {
    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false);

      return (
        <>
          <Checkbox
            id={id}
            parentId={parentId}
            checked={checked}
            textoAccesibilidad="Controlled checkbox"
          />
          <button onClick={() => setChecked(!checked)}>Toggle</button>
        </>
      );
    };

    render(<TestComponent />);
    const checkbox = screen.getByRole('checkbox', {
      name: 'Controlled checkbox',
    }) as HTMLInputElement;
    const toggleButton = screen.getByText('Toggle');

    expect(checkbox.checked).toBe(false);

    await userEvent.click(toggleButton);
    expect(checkbox.checked).toBe(true);
  });

  it('actualiza indeterminate cuando cambia la prop', async () => {
    const TestComponent = () => {
      const [indeterminate, setIndeterminate] = React.useState(false);

      return (
        <>
          <Checkbox
            id={id}
            parentId={parentId}
            indeterminate={indeterminate}
            textoAccesibilidad="Controlled indeterminate"
          />
          <button onClick={() => setIndeterminate(!indeterminate)}>
            Toggle Indeterminate
          </button>
        </>
      );
    };

    const { container } = render(<TestComponent />);
    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    const toggleButton = screen.getByText('Toggle Indeterminate');

    expect(checkbox.indeterminate).toBe(false);

    await userEvent.click(toggleButton);
    expect(checkbox.indeterminate).toBe(true);
  });
});

// Tests de accessibility extendidos
describe('Accessibility extendida', () => {
  it('tiene el aria-label correcto', () => {
    const ariaLabel = 'Checkbox con aria-label personalizado';
    render(
      <Checkbox id={id} parentId={parentId} textoAccesibilidad={ariaLabel} />,
    );

    const checkbox = screen.getByLabelText(ariaLabel);
    expect(checkbox).toHaveAttribute('aria-label', ariaLabel);
  });

  it('usa aria-label por defecto cuando no se proporciona', () => {
    render(<Checkbox id={id} parentId={parentId} textoAccesibilidad="" />);

    const checkbox = screen.getByLabelText('checkbox-accessibility-text');
    expect(checkbox).toHaveAttribute(
      'aria-label',
      'checkbox-accessibility-text',
    );
  });

  it('es navegable por teclado', async () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        textoAccesibilidad="Keyboard navigation"
      />,
    );

    const checkbox = screen.getByLabelText('Keyboard navigation');

    // Foco inicial
    checkbox.focus();
    expect(checkbox).toHaveFocus();

    // Activación con espacio
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});

// Tests de edge cases
describe('Edge cases', () => {
  it('maneja props undefined sin errores', () => {
    render(
      <Checkbox
        id={id}
        parentId={parentId}
        checked={undefined}
        indeterminate={undefined}
        textoAccesibilidad="Undefined props"
      />,
    );

    const checkbox = screen.getByLabelText(
      'Undefined props',
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    expect(checkbox.indeterminate).toBe(false);
  });

  it('maneja cambio de indeterminate a false correctamente', async () => {
    const TestComponent = () => {
      const [indeterminate, setIndeterminate] = React.useState(true);

      return (
        <>
          <Checkbox
            id={id}
            parentId={parentId}
            indeterminate={indeterminate}
            textoAccesibilidad="Indeterminate to false"
          />
          <button onClick={() => setIndeterminate(false)}>Set False</button>
        </>
      );
    };

    const { container } = render(<TestComponent />);
    const checkbox = container.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    const button = screen.getByText('Set False');

    expect(checkbox.indeterminate).toBe(true);

    await userEvent.click(button);
    expect(checkbox.indeterminate).toBe(false);
  });

  it('maneja ref forwarding correctamente', () => {
    const TestComponent = () => {
      const checkboxRef = useRef<HTMLInputElement>(null);

      return (
        <Checkbox
          ref={checkboxRef}
          id={id}
          parentId={parentId}
          textoAccesibilidad="Ref forwarding test"
        />
      );
    };

    render(<TestComponent />);
    const checkbox = screen.getByLabelText('Ref forwarding test');
    expect(checkbox).toBeInTheDocument();
  });
});
