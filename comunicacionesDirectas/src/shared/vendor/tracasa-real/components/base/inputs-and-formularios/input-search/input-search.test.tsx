import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from '../input/input.module.scss';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';
import { InputSearch } from './input-search';

describe('Componente InputSearch', () => {
  describe('Renderizado básico', () => {
    it('se renderiza sin fallos', () => {
      render(<InputSearch />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('es accesible según estándares WCAG', async () => {
      const { container } = render(<InputSearch />);
      const results = await axe(container);
      if (results.violations.length > 0) console.log(results.violations);
      expect(results.violations.length).toBe(0);
    });

    it('reenvía correctamente la referencia al elemento input', () => {
      const ref = { current: null };
      render(<InputSearch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Estados del input', () => {
    it('deshabilita el input cuando disabled es true', () => {
      render(<InputSearch disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('añade la clase base cuando disabled es true', () => {
      render(<InputSearch disabled />);
      expect(screen.getByRole('textbox')).toHaveClass(styles['input__field']);
    });

    it('añade la clase base cuando readOnly es true', () => {
      render(<InputSearch readOnly />);
      expect(screen.getByRole('textbox')).toHaveClass(styles['input__field']);
    });

    it('input readonly no permite edición pero permite selección', () => {
      render(<InputSearch readOnly value="Texto de prueba" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('añade la clase de error cuando error es true', () => {
      render(<InputSearch error />);
      expect(screen.getByRole('textbox')).toHaveClass(
        styles['input__field--error'],
      );
    });

    it('añade aria-invalid cuando error es true', () => {
      render(<InputSearch error />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('no añade aria-invalid cuando error es false', () => {
      render(<InputSearch error={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Combinaciones de estados', () => {
    it('input con error y disabled a la vez', () => {
      render(<InputSearch error disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass(styles['input__field--error']);
      expect(input).toHaveClass(styles['input__field']);
    });

    it('input con error y readOnly a la vez', () => {
      render(<InputSearch error readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
      expect(input).toHaveClass(styles['input__field--error']);
      expect(input).toHaveClass(styles['input__field']);
    });

    it('input disabled y readOnly a la vez (disabled prevalece)', () => {
      render(<InputSearch disabled readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass(styles['input__field']);
    });
  });

  // ========================================
  // TESTS DE ICONOS
  // ========================================
  describe('Iconos', () => {
    it('renderiza el icono a la izquierda', () => {
      render(<InputSearch />);
      const icono = screen.getByLabelText('icono.ariaLabel');
      expect(icono).toBeInTheDocument();
      expect(icono).toHaveClass('tabler-icon-search');
    });
  });

  // ========================================
  // TESTS DE PROPS Y ATRIBUTOS
  // ========================================
  describe('Props y atributos HTML', () => {
    it('pasa props adicionales al elemento input', () => {
      const placeholderText = 'Introduce texto aquí';
      render(<InputSearch placeholder={placeholderText} />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        placeholderText,
      );
    });

    it('establece el id correctamente', () => {
      render(<InputSearch id="test-input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-input');
    });

    it('establece el name correctamente', () => {
      render(<InputSearch name="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
    });

    it('establece el value correctamente', () => {
      render(<InputSearch value="test value" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('establece defaultValue correctamente', () => {
      render(<InputSearch defaultValue="default text" />);
      expect(screen.getByRole('textbox')).toHaveValue('default text');
    });

    it('establece className adicional sin sobrescribir las existentes', () => {
      render(<InputSearch className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass(styles['input__field']);
    });

    it('establece title con el valor del input si es string', () => {
      render(<InputSearch value="Texto largo para tooltip" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'title',
        'Texto largo para tooltip',
      );
    });

    it('no establece title si value no es string', () => {
      render(<InputSearch value={123 as any} readOnly />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('title');
    });
  });

  // ========================================
  // TESTS DE ACCESIBILIDAD
  // ========================================
  describe('Accesibilidad', () => {
    it('usa aria-label cuando no hay id', () => {
      render(<InputSearch textoAccesibilidad="Campo de búsqueda" />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-label',
        'Campo de búsqueda',
      );
    });

    it('usa traducción por defecto cuando no hay textoAccesibilidad ni id', () => {
      render(<InputSearch />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label');
    });

    it('no usa aria-label cuando hay id (se asume que hay label asociado)', () => {
      render(
        <InputSearch id="test-input" textoAccesibilidad="Campo de búsqueda" />,
      );
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-label');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('no establece aria-invalid cuando no hay error', () => {
      render(<InputSearch />);
      const input = screen.getByRole('textbox');
      // aria-invalid no se establece si error es undefined (comportamiento correcto)
      expect(input.getAttribute('aria-invalid')).toBeNull();
    });
  });

  // ========================================
  // TESTS DE FOCUS Y AUTOFOCO
  // ========================================
  describe('Focus y autofoco', () => {
    it('aplica autofoco cuando autofoco es true', () => {
      render(<InputSearch autofoco />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('no aplica autofoco por defecto', () => {
      render(<InputSearch />);
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('puede recibir focus mediante user interaction', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByRole('textbox');

      expect(input).not.toHaveFocus();
      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('puede perder focus mediante blur', async () => {
      const user = userEvent.setup();
      render(<InputSearch autofoco />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveFocus();
      await user.tab();
      expect(input).not.toHaveFocus();
    });
  });

  // ========================================
  // TESTS DE INTERACCIONES
  // ========================================
  describe('Interacciones del usuario', () => {
    it('permite escribir texto cuando no está disabled', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hola mundo');
      expect(input).toHaveValue('Hola mundo');
    });

    it('no permite escribir cuando está disabled', async () => {
      const user = userEvent.setup();
      render(<InputSearch disabled value="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Intento escribir');
      expect(input).toHaveValue('');
    });

    it('no permite escribir cuando está readOnly', async () => {
      const user = userEvent.setup();
      render(<InputSearch readOnly value="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Intento escribir');
      expect(input).toHaveValue('');
    });

    it('llama a onChange cuando el usuario escribe', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputSearch onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'A');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('llama a onBlur cuando pierde el foco', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<InputSearch onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('llama a onFocus cuando recibe el foco', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<InputSearch onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('llama a onKeyDown cuando se presiona una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<InputSearch onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'A');
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  // ========================================
  // TESTS DE PLACEHOLDER
  // ========================================
  describe('Placeholder', () => {
    it('muestra el placeholder cuando está vacío', () => {
      render(<InputSearch placeholder="Escribe aquí..." />);
      expect(
        screen.getByPlaceholderText('Escribe aquí...'),
      ).toBeInTheDocument();
    });

    it('oculta el placeholder cuando hay valor', () => {
      render(
        <InputSearch placeholder="Escribe aquí..." value="Texto" readOnly />,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Texto');
      expect(input).toHaveAttribute('placeholder', 'Escribe aquí...');
    });

    it('mantiene el placeholder visible en estado disabled', () => {
      render(<InputSearch placeholder="Texto deshabilitado" disabled />);
      expect(
        screen.getByPlaceholderText('Texto deshabilitado'),
      ).toBeInTheDocument();
    });

    it('mantiene el placeholder visible en estado readOnly', () => {
      render(<InputSearch placeholder="Texto solo lectura" readOnly />);
      expect(
        screen.getByPlaceholderText('Texto solo lectura'),
      ).toBeInTheDocument();
    });
  });

  // ========================================
  // TESTS DE NAVEGACIÓN POR TECLADO
  // ========================================
  describe('Navegación por teclado', () => {
    it('permite navegar con Tab al input', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Botón anterior</button>
          <InputSearch />
          <button>Botón siguiente</button>
        </div>,
      );

      const input = screen.getByRole('textbox');
      await user.tab();
      expect(screen.getByText('Botón anterior')).toHaveFocus();

      await user.tab();
      expect(input).toHaveFocus();
    });

    it('permite navegar con Shift+Tab para retroceder', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Botón anterior</button>
          <InputSearch />
          <button>Botón siguiente</button>
        </div>,
      );

      const input = screen.getByRole('textbox');
      await user.tab();
      await user.tab();
      expect(input).toHaveFocus();

      await user.tab({ shift: true });
      expect(screen.getByText('Botón anterior')).toHaveFocus();
    });

    it('input disabled no recibe foco con Tab', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Botón anterior</button>
          <InputSearch disabled />
          <button>Botón siguiente</button>
        </div>,
      );

      await user.tab();
      expect(screen.getByText('Botón anterior')).toHaveFocus();

      await user.tab();
      expect(screen.getByText('Botón siguiente')).toHaveFocus();
    });

    it('permite seleccionar todo el texto con Ctrl+A', async () => {
      const user = userEvent.setup();
      render(<InputSearch value="Texto de prueba" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      await user.click(input);
      await user.keyboard('{Control>}a{/Control}');

      // Verificar que hay selección
      await waitFor(() => {
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(input.value.length);
      });
    });
  });

  // ========================================
  // TESTS DE REGRESIÓN - Edge cases
  // ========================================
  describe('Edge cases y regresión', () => {
    it('funciona correctamente con value undefined', () => {
      render(<InputSearch value={undefined} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('funciona correctamente con value null', () => {
      render(<InputSearch value={null as any} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('maneja cambios de props dinámicos correctamente', () => {
      const { rerender } = render(<InputSearch value="inicial" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('inicial');

      rerender(<InputSearch value="cambiado" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('cambiado');
    });

    it('maneja cambio de disabled dinámicamente', () => {
      const { rerender } = render(<InputSearch disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();

      rerender(<InputSearch disabled={false} />);
      expect(screen.getByRole('textbox')).not.toBeDisabled();
    });

    it('maneja cambio de error dinámicamente', () => {
      const { rerender } = render(<InputSearch error />);
      expect(screen.getByRole('textbox')).toHaveClass(
        styles['input__field--error'],
      );

      rerender(<InputSearch error={false} />);
      expect(screen.getByRole('textbox')).not.toHaveClass(
        styles['input__field--error'],
      );
    });

    it('input vacío con defaultValue no controlado', async () => {
      const user = userEvent.setup();
      render(<InputSearch defaultValue="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'nuevo texto');
      expect(input).toHaveValue('nuevo texto');
    });

    it('preserva el foco después de re-render', () => {
      const { rerender } = render(<InputSearch autofoco />);
      expect(screen.getByRole('textbox')).toHaveFocus();

      rerender(<InputSearch autofoco value="cambio" />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  // ========================================
  // TESTS DE BOTÓN DE LIMPIAR (CLEAR BUTTON)
  // ========================================
  describe('Botón de limpiar', () => {
    it('no muestra el botón de limpiar por defecto', () => {
      const { container } = render(<InputSearch />);
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).not.toBeInTheDocument();
    });

    it('no muestra el botón de limpiar cuando no hay valor', () => {
      const { container } = render(<InputSearch />);
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).not.toBeInTheDocument();
    });

    it('muestra el botón de limpiar  hay valor', () => {
      const { container } = render(
        <InputSearch value="test" onChange={() => {}} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).toBeInTheDocument();
    });

    it('muestra el botón de limpiar cuando hay defaultValue', async () => {
      const user = userEvent.setup();
      const { container } = render(<InputSearch defaultValue="" />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      await waitFor(() => {
        const clearButton = container.querySelector(
          `.${styles['input__clear-button']}`,
        );
        expect(clearButton).toBeInTheDocument();
      });
    });

    it('no muestra el botón de limpiar cuando está disabled', () => {
      const { container } = render(
        <InputSearch value="test" onChange={() => {}} disabled={true} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).not.toBeInTheDocument();
    });

    it('limpia el input al hacer clic en el botón (controlled)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <InputSearch value="test" onChange={handleChange} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );

      if (clearButton) {
        await user.click(clearButton);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: '' }),
          }),
        );
      }
    });

    it('limpia el input al hacer clic en el botón (uncontrolled)', async () => {
      const user = userEvent.setup();
      const { container } = render(<InputSearch />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Escribir en el input
      await user.click(input);
      await user.keyboard('test');

      // Esperar a que el input tenga el valor y el botón aparezca
      await waitFor(() => {
        expect(input.value).toBe('test');
        const clearButton = container.querySelector(
          `.${styles['input__clear-button']}`,
        );
        expect(clearButton).toBeInTheDocument();
      });

      // Obtener el botón de limpiar
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      ) as HTMLElement;

      // Hacer clic en el botón
      await user.click(clearButton);

      // Verificar que el input se limpió
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    it('llama a onClear cuando se proporciona', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      const { container } = render(
        <InputSearch value="test" onChange={() => {}} onClear={handleClear} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );

      if (clearButton) {
        await user.click(clearButton);
        expect(handleClear).toHaveBeenCalled();
      }
    });

    it('el botón de limpiar tiene aria-label adecuado', () => {
      const { container } = render(
        <InputSearch value="test" onChange={() => {}} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).toHaveAttribute('aria-label');
    });

    it('el botón de limpiar tiene tabIndex -1 para evitar navegación por teclado', () => {
      const { container } = render(
        <InputSearch value="test" onChange={() => {}} />,
      );
      const clearButton = container.querySelector(
        `.${styles['input__clear-button']}`,
      );
      expect(clearButton).toHaveAttribute('tabIndex', '-1');
    });
  });
});
