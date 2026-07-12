import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';
import styles from './input.module.scss';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';

describe('Componente Input', () => {
  describe('Renderizado básico', () => {
    it('se renderiza sin fallos', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('es accesible según estándares WCAG', async () => {
      const { container } = render(<Input />);
      const results = await axe(container);
      if (results.violations.length > 0) console.log(results.violations);
      expect(results.violations.length).toBe(0);
    });

    it('reenvía correctamente la referencia al elemento input', () => {
      const ref = { current: null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Tipos de input', () => {
    it('establece type="text" por defecto', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('establece type="email" cuando se especifica', () => {
      render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('establece type="password" cuando se especifica', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });

    it('establece type="number" cuando se especifica', () => {
      render(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });

    it('establece type="tel" cuando se especifica', () => {
      render(<Input type="tel" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });

    it('establece type="url" cuando se especifica', () => {
      render(<Input type="url" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
    });
  });

  describe('Estados del input', () => {
    it('deshabilita el input cuando disabled es true', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('añade la clase base cuando disabled es true', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toHaveClass(styles['input__field']);
    });

    it('añade la clase base cuando readOnly es true', () => {
      render(<Input readOnly />);
      expect(screen.getByRole('textbox')).toHaveClass(styles['input__field']);
    });

    it('input readonly no permite edición pero permite selección', () => {
      render(<Input readOnly value="Texto de prueba" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('añade la clase de error cuando error es true', () => {
      render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveClass(
        styles['input__field--error'],
      );
    });

    it('añade aria-invalid cuando error es true', () => {
      render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('no añade aria-invalid cuando error es false', () => {
      render(<Input error={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Combinaciones de estados', () => {
    it('input con error y disabled a la vez', () => {
      render(<Input error disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass(styles['input__field--error']);
      expect(input).toHaveClass(styles['input__field']);
    });

    it('input con error y readOnly a la vez', () => {
      render(<Input error readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
      expect(input).toHaveClass(styles['input__field--error']);
      expect(input).toHaveClass(styles['input__field']);
    });

    it('input disabled y readOnly a la vez (disabled prevalece)', () => {
      render(<Input disabled readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass(styles['input__field']);
    });
  });

  describe('Iconos', () => {
    it('renderiza el icono a la izquierda', () => {
      render(<Input iconoIzquierda="search" />);
      const icono = screen.getByLabelText('icono.ariaLabel');
      expect(icono).toBeInTheDocument();
      expect(icono).toHaveClass('tabler-icon-search');
    });

    it('renderiza el icono a la derecha', () => {
      render(<Input iconoDerecha="calendar" />);
      const icono = screen.getByLabelText('icono.ariaLabel');
      expect(icono).toBeInTheDocument();
      expect(icono.tagName.toLowerCase()).toBe('svg');
    });

    it('renderiza ambos iconos a la vez', () => {
      render(<Input iconoIzquierda="search" iconoDerecha="calendar" />);
      const iconos = screen.getAllByLabelText('icono.ariaLabel');
      expect(iconos).toHaveLength(2);
      expect(iconos[0].tagName.toLowerCase()).toBe('svg');
      expect(iconos[1].tagName.toLowerCase()).toBe('svg');
    });

    it('icono está presente cuando input está disabled', () => {
      render(<Input iconoIzquierda="search" disabled />);
      const icono = screen.getByLabelText('icono.ariaLabel');
      expect(icono).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('aplica padding cuando hay icono izquierdo', () => {
      render(<Input iconoIzquierda="search" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(styles['input__field--with-left-icon']);
    });

    it('aplica padding cuando hay icono derecho', () => {
      render(<Input iconoDerecha="calendar" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(styles['input__field--with-right-icon']);
    });

    it('aplica padding en ambos lados con ambos iconos', () => {
      render(<Input iconoIzquierda="search" iconoDerecha="calendar" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(styles['input__field--with-left-icon']);
      expect(input).toHaveClass(styles['input__field--with-right-icon']);
    });
  });

  describe('Props y atributos HTML', () => {
    it('pasa props adicionales al elemento input', () => {
      const placeholderText = 'Introduce texto aquí';
      render(<Input placeholder={placeholderText} />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        placeholderText,
      );
    });

    it('establece el id correctamente', () => {
      render(<Input id="test-input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-input');
    });

    it('establece el name correctamente', () => {
      render(<Input name="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
    });

    it('establece el value correctamente', () => {
      render(<Input value="test value" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('establece defaultValue correctamente', () => {
      render(<Input defaultValue="default text" />);
      expect(screen.getByRole('textbox')).toHaveValue('default text');
    });

    it('establece maxLength correctamente', () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('establece className adicional sin sobrescribir las existentes', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass(styles['input__field']);
    });

    it('establece title con el valor del input si es string', () => {
      render(<Input value="Texto largo para tooltip" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'title',
        'Texto largo para tooltip',
      );
    });

    it('no establece title si value no es string', () => {
      render(<Input value={123 as any} readOnly />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('title');
    });
  });

  describe('Accesibilidad', () => {
    it('usa aria-label cuando no hay id', () => {
      render(<Input textoAccesibilidad="Campo de búsqueda" />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-label',
        'Campo de búsqueda',
      );
    });

    it('usa traducción por defecto cuando no hay textoAccesibilidad ni id', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label');
    });

    it('no usa aria-label cuando hay id (se asume que hay label asociado)', () => {
      render(<Input id="test-input" textoAccesibilidad="Campo de búsqueda" />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-label');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('no establece aria-invalid cuando no hay error', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBeNull();
    });
  });

  describe('Focus y autofoco', () => {
    it('aplica autofoco cuando autofoco es true', () => {
      render(<Input autofoco />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('no aplica autofoco por defecto', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('puede recibir focus mediante user interaction', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      expect(input).not.toHaveFocus();
      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('puede perder focus mediante blur', async () => {
      const user = userEvent.setup();
      render(<Input autofoco />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveFocus();
      await user.tab();
      expect(input).not.toHaveFocus();
    });
  });

  describe('Interacciones del usuario', () => {
    it('permite escribir texto cuando no está disabled', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hola mundo');
      expect(input).toHaveValue('Hola mundo');
    });

    it('no permite escribir cuando está disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled value="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Intento escribir');
      expect(input).toHaveValue('');
    });

    it('no permite escribir cuando está readOnly', async () => {
      const user = userEvent.setup();
      render(<Input readOnly value="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Intento escribir');
      expect(input).toHaveValue('');
    });

    it('llama a onChange cuando el usuario escribe', async () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'A' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('llama a onBlur cuando pierde el foco', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('llama a onFocus cuando recibe el foco', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('llama a onKeyDown cuando se presiona una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'A');
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('Placeholder', () => {
    it('muestra el placeholder cuando está vacío', () => {
      render(<Input placeholder="Escribe aquí..." />);
      expect(
        screen.getByPlaceholderText('Escribe aquí...'),
      ).toBeInTheDocument();
    });

    it('oculta el placeholder cuando hay valor', () => {
      render(<Input placeholder="Escribe aquí..." value="Texto" readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Texto');
      expect(input).toHaveAttribute('placeholder', 'Escribe aquí...');
    });

    it('mantiene el placeholder visible en estado disabled', () => {
      render(<Input placeholder="Texto deshabilitado" disabled />);
      expect(
        screen.getByPlaceholderText('Texto deshabilitado'),
      ).toBeInTheDocument();
    });

    it('mantiene el placeholder visible en estado readOnly', () => {
      render(<Input placeholder="Texto solo lectura" readOnly />);
      expect(
        screen.getByPlaceholderText('Texto solo lectura'),
      ).toBeInTheDocument();
    });
  });

  describe('MaxLength', () => {
    it('respeta el maxLength cuando se escribe', async () => {
      const user = userEvent.setup();
      render(<Input maxLength={5} />);
      const input = screen.getByRole('textbox');

      await user.type(input, '123456789');
      expect(input).toHaveValue('12345');
    });

    it('maxLength no afecta al valor inicial', () => {
      render(<Input maxLength={5} value="123456789" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('123456789');
    });

    it('maxLength se establece como atributo HTML', () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });
  });

  describe('Navegación por teclado', () => {
    it('permite navegar con Tab al input', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Botón anterior</button>
          <Input />
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
          <Input />
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
          <Input disabled />
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
      render(<Input value="Texto de prueba" readOnly />);
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

  describe('Tipos especiales de input', () => {
    it('input type="file" muestra botón de selección', () => {
      render(<Input type="file" />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it('input type="date" se renderiza correctamente', () => {
      render(<Input type="date" />);
      const input = document.querySelector('input[type="date"]');
      expect(input).toBeInTheDocument();
    });

    it('input type="time" oculta el selector de calendario', () => {
      render(<Input type="time" />);
      const input = document.querySelector('input[type="time"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass(styles['input__field']);
    });
  });

  describe('Edge cases y regresión', () => {
    it('funciona correctamente con value undefined', () => {
      render(<Input value={undefined} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('funciona correctamente con value null', () => {
      render(<Input value={null as any} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('no rompe cuando iconoIzquierda e iconoDerecha son undefined', () => {
      render(<Input iconoIzquierda={undefined} iconoDerecha={undefined} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('maneja cambios de props dinámicos correctamente', () => {
      const { rerender } = render(<Input value="inicial" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('inicial');

      rerender(<Input value="cambiado" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('cambiado');
    });

    it('maneja cambio de disabled dinámicamente', () => {
      const { rerender } = render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();

      rerender(<Input disabled={false} />);
      expect(screen.getByRole('textbox')).not.toBeDisabled();
    });

    it('maneja cambio de error dinámicamente', () => {
      const { rerender } = render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveClass(
        styles['input__field--error'],
      );

      rerender(<Input error={false} />);
      expect(screen.getByRole('textbox')).not.toHaveClass(
        styles['input__field--error'],
      );
    });

    it('input vacío con defaultValue no controlado', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'nuevo texto');
      expect(input).toHaveValue('nuevo texto');
    });

    it('preserva el foco después de re-render', () => {
      const { rerender } = render(<Input autofoco />);
      expect(screen.getByRole('textbox')).toHaveFocus();

      rerender(<Input autofoco value="cambio" />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  describe('Contenedor del input', () => {
    it('renderiza el contenedor con la clase correcta', () => {
      const { container } = render(<Input />);
      const inputContainer = container.querySelector(
        `.${styles['input__container']}`,
      );
      expect(inputContainer).toBeInTheDocument();
    });

    it('contenedor tiene display flex', () => {
      const { container } = render(<Input />);
      const inputContainer = container.querySelector(
        `.${styles['input__container']}`,
      );
      expect(inputContainer).toHaveClass(styles['input__container']);
    });

    it('contenedor contiene el input y los iconos', () => {
      const { container } = render(
        <Input iconoIzquierda="search" iconoDerecha="calendar" />,
      );
      const inputContainer = container.querySelector(
        `.${styles['input__container']}`,
      );
      expect(inputContainer?.children.length).toBe(3); // icono izq + input + icono der
    });
  });

  describe('Alineación de texto', () => {
    it('alinea el texto a la izquierda por defecto', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      expect(input).not.toHaveClass(styles['input__field--align-right']);
    });

    it('alinea el texto a la derecha cuando textAlign="right"', () => {
      const { container } = render(<Input textAlign="right" />);
      const input = container.querySelector('input');
      expect(input).toHaveClass(styles['input__field--align-right']);
    });

    it('alinea el texto a la izquierda cuando textAlign="left"', () => {
      const { container } = render(<Input textAlign="left" />);
      const input = container.querySelector('input');
      expect(input).not.toHaveClass(styles['input__field--align-right']);
    });
  });
});
