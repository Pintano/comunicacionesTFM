import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { InputProps } from './input';
import { Input } from './input';
import { inputDocumentation } from './input.docs';
import { generateStorybookDocs } from '../../../../../.storybook/docs-generator/docs.utils';

const meta: Meta<InputProps> = {
  title: 'Componentes/Inputs & Formularios/Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: generateStorybookDocs(inputDocumentation),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'date',
        'time',
      ],
      description: 'Tipo de input HTML',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Si el input está en estado de error',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el input está deshabilitado',
    },
    readOnly: {
      control: 'boolean',
      description: 'Si el input es de solo lectura',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    maxLength: {
      control: 'number',
      description: 'Longitud máxima permitida',
    },
    iconoIzquierda: {
      control: 'text',
      description: 'Nombre del icono a la izquierda',
    },
    iconoDerecha: {
      control: 'text',
      description: 'Nombre del icono a la derecha',
    },
    autofoco: {
      control: 'boolean',
      description: 'Si el input recibe foco automáticamente',
    },
    textoAccesibilidad: {
      control: 'text',
      description: 'Etiqueta de accesibilidad para lectores de pantalla',
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

// ========================================
// ESTADOS BÁSICOS
// ========================================

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
    textoAccesibilidad: 'Campo de texto por defecto',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Texto introducido',
    readOnly: true,
    textoAccesibilidad: 'Campo con valor',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Introduce tu nombre completo',
    textoAccesibilidad: 'Campo de nombre',
  },
};

export const Empty: Story = {
  args: {
    textoAccesibilidad: 'Campo vacío',
  },
};

// ========================================
// TIPOS DE INPUT
// ========================================

export const TypesShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Text
        </label>
        <Input
          type="text"
          placeholder="Texto normal"
          textoAccesibilidad="Input de texto"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Email
        </label>
        <Input
          type="email"
          placeholder="correo@ejemplo.com"
          textoAccesibilidad="Input de email"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          textoAccesibilidad="Input de contraseña"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Number
        </label>
        <Input
          type="number"
          placeholder="123"
          textoAccesibilidad="Input numérico"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Tel
        </label>
        <Input
          type="tel"
          placeholder="(+34) 600 000 000"
          textoAccesibilidad="Input de teléfono"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          URL
        </label>
        <Input
          type="url"
          placeholder="https://ejemplo.com"
          textoAccesibilidad="Input de URL"
        />
      </div>
    </div>
  ),
};

// ========================================
// ESTADOS INTERACTIVOS
// ========================================

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Campo con error',
    textoAccesibilidad: 'Campo con error de validación',
  },
};

export const ErrorWithValue: Story = {
  args: {
    error: true,
    value: 'Valor incorrecto',
    readOnly: true,
    textoAccesibilidad: 'Campo con error y valor',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Campo deshabilitado',
    textoAccesibilidad: 'Campo deshabilitado',
  },
};

export const DisabledEmpty: Story = {
  args: {
    disabled: true,
    placeholder: 'No disponible',
    textoAccesibilidad: 'Campo deshabilitado vacío',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Campo de solo lectura',
    textoAccesibilidad: 'Campo de solo lectura',
  },
};

export const ReadOnlyWithPlaceholder: Story = {
  args: {
    readOnly: true,
    placeholder: 'Solo lectura',
    textoAccesibilidad: 'Campo de solo lectura con placeholder',
  },
};

// ========================================
// COMBINACIONES DE ESTADOS
// ========================================

export const StateMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        minWidth: '700px',
      }}
    >
      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          Normal
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input placeholder="Vacío" textoAccesibilidad="Normal vacío" />
          <Input
            value="Con valor"
            readOnly
            textoAccesibilidad="Normal con valor"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          Error
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            error
            placeholder="Error vacío"
            textoAccesibilidad="Error vacío"
          />
          <Input
            error
            value="Error con valor"
            readOnly
            textoAccesibilidad="Error con valor"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          Disabled
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            disabled
            placeholder="Disabled vacío"
            textoAccesibilidad="Disabled vacío"
          />
          <Input
            disabled
            value="Disabled valor"
            textoAccesibilidad="Disabled con valor"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          ReadOnly
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            readOnly
            placeholder="ReadOnly vacío"
            textoAccesibilidad="ReadOnly vacío"
          />
          <Input
            readOnly
            value="ReadOnly valor"
            textoAccesibilidad="ReadOnly valor"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          Error + Disabled
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            error
            disabled
            placeholder="Combinado"
            textoAccesibilidad="Error disabled"
          />
          <Input
            error
            disabled
            value="Combinado valor"
            textoAccesibilidad="Error disabled valor"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          Error + ReadOnly
        </h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            error
            readOnly
            placeholder="Combinado"
            textoAccesibilidad="Error readonly"
          />
          <Input
            error
            readOnly
            value="Combinado valor"
            textoAccesibilidad="Error readonly valor"
          />
        </div>
      </div>
    </div>
  ),
};

// ========================================
// ICONOS
// ========================================

export const WithLeftIcon: Story = {
  args: {
    iconoIzquierda: 'search',
    placeholder: 'Buscar...',
    textoAccesibilidad: 'Campo de búsqueda',
  },
};

export const WithRightIcon: Story = {
  args: {
    iconoDerecha: 'calendar',
    placeholder: 'Seleccionar fecha',
    textoAccesibilidad: 'Selector de fecha',
  },
};

export const WithBothIcons: Story = {
  args: {
    iconoIzquierda: 'user',
    iconoDerecha: 'clockSearch',
    placeholder: 'Usuario',
    textoAccesibilidad: 'Campo de usuario con limpieza',
  },
};

export const IconsShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <div>
        <label
          style={{
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Búsqueda
        </label>
        <Input
          iconoIzquierda="search"
          placeholder="Buscar..."
          textoAccesibilidad="Búsqueda"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Usuario
        </label>
        <Input
          iconoIzquierda="user"
          placeholder="Nombre de usuario"
          textoAccesibilidad="Usuario"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Email
        </label>
        <Input
          iconoIzquierda="mail"
          type="email"
          placeholder="correo@ejemplo.com"
          textoAccesibilidad="Email"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Contraseña
        </label>
        <Input
          iconoIzquierda="lock"
          iconoDerecha="eyeCheck"
          type="password"
          placeholder="••••••••"
          textoAccesibilidad="Contraseña"
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}
        >
          Fecha
        </label>
        <Input type="date" textoAccesibilidad="Fecha" />
      </div>
    </div>
  ),
};

export const IconsWithStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        minWidth: '600px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Normal</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            iconoIzquierda="search"
            placeholder="Normal"
            textoAccesibilidad="Normal"
          />
          <Input
            iconoIzquierda="search"
            value="Con valor"
            readOnly
            textoAccesibilidad="Con valor"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Error</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            error
            iconoIzquierda="search"
            placeholder="Error"
            textoAccesibilidad="Error"
          />
          <Input
            error
            iconoIzquierda="search"
            value="Error valor"
            readOnly
            textoAccesibilidad="Error valor"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Disabled</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            disabled
            iconoIzquierda="search"
            placeholder="Disabled"
            textoAccesibilidad="Disabled"
          />
          <Input
            disabled
            iconoIzquierda="search"
            value="Disabled valor"
            textoAccesibilidad="Disabled valor"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>ReadOnly</h4>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <Input
            readOnly
            iconoIzquierda="search"
            placeholder="ReadOnly"
            textoAccesibilidad="ReadOnly"
          />
          <Input
            readOnly
            iconoIzquierda="search"
            value="ReadOnly valor"
            textoAccesibilidad="ReadOnly valor"
          />
        </div>
      </div>
    </div>
  ),
};

// ========================================
// MAXLENGTH
// ========================================

export const WithMaxLength: Story = {
  args: {
    maxLength: 10,
    placeholder: 'Máximo 10 caracteres',
    textoAccesibilidad: 'Campo con límite de caracteres',
  },
};

export const MaxLengthExample: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ minWidth: '300px' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={20}
          placeholder="Máximo 20 caracteres"
          textoAccesibilidad="Input con maxLength"
        />
        <div
          style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}
        >
          {value.length} / 20 caracteres
        </div>
      </div>
    );
  },
};

// ========================================
// AUTOFOCO
// ========================================

export const WithAutofocus: Story = {
  args: {
    autofoco: true,
    placeholder: 'Este campo tiene autofoco',
    textoAccesibilidad: 'Campo con autofoco',
  },
};

// ========================================
// EJEMPLOS INTERACTIVOS
// ========================================

export const InteractiveControlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setError(newValue.length > 0 && newValue.length < 3);
    };

    return (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>
          Input Controlado con Validación
        </h4>
        <Input
          value={value}
          onChange={handleChange}
          error={error}
          placeholder="Mínimo 3 caracteres"
          textoAccesibilidad="Input con validación"
        />
        {error && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#cd282b',
              marginTop: '0.5rem',
            }}
          >
            Debe tener al menos 3 caracteres
          </div>
        )}
        {value.length >= 3 && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#39623e',
              marginTop: '0.5rem',
            }}
          >
            ✓ Válido
          </div>
        )}
      </div>
    );
  },
};

export const SearchExample: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Ejemplo de Búsqueda</h4>
        <Input
          iconoIzquierda="search"
          iconoDerecha={searchTerm ? 'clockSearch' : undefined}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          textoAccesibilidad="Campo de búsqueda"
        />
        {searchTerm && (
          <div style={{ fontSize: '0.875rem', marginTop: '0.75rem' }}>
            Buscando: <strong>{searchTerm}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const LoginForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: false, password: false });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const emailError = !formData.email.includes('@');
      const passwordError = formData.password.length < 6;
      setErrors({ email: emailError, password: passwordError });
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '300px',
        }}
      >
        <h4 style={{ margin: '0 0 1rem 0' }}>Ejemplo de Formulario</h4>

        <div>
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              display: 'block',
            }}
          >
            Email
          </label>
          <Input
            type="email"
            iconoIzquierda="mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            placeholder="correo@ejemplo.com"
            textoAccesibilidad="Email"
          />
          {errors.email && (
            <div
              style={{
                fontSize: '0.75rem',
                color: '#cd282b',
                marginTop: '0.25rem',
              }}
            >
              Email inválido
            </div>
          )}
        </div>

        <div>
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              display: 'block',
            }}
          >
            Contraseña
          </label>
          <Input
            type="password"
            iconoIzquierda="lock"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            placeholder="Mínimo 6 caracteres"
            textoAccesibilidad="Contraseña"
          />
          {errors.password && (
            <div
              style={{
                fontSize: '0.75rem',
                color: '#cd282b',
                marginTop: '0.25rem',
              }}
            >
              La contraseña debe tener al menos 6 caracteres
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#337ab8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Iniciar sesión
        </button>
      </form>
    );
  },
};

// ========================================
// CASOS DE USO REALES
// ========================================

export const RealWorldExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
    >
      <div>
        <h4
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Búsqueda Global
        </h4>
        <Input
          iconoIzquierda="search"
          placeholder="Buscar en todo el sistema..."
          textoAccesibilidad="Búsqueda global"
        />
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Filtro Numérico
        </h4>
        <Input
          type="number"
          iconoIzquierda="filtros"
          placeholder="Filtrar por importe"
          textoAccesibilidad="Filtro de importe"
        />
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Selector de Fecha
        </h4>
        <Input type="date" textoAccesibilidad="Selector de fecha" />
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          URL del Documento
        </h4>
        <Input
          type="url"
          iconoIzquierda="link"
          value="https://ejemplo.com/documento.pdf"
          readOnly
          textoAccesibilidad="URL del documento"
        />
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Teléfono de Contacto
        </h4>
        <Input
          type="tel"
          iconoIzquierda="file"
          placeholder="(+34) 600 000 000"
          textoAccesibilidad="Teléfono de contacto"
        />
      </div>
    </div>
  ),
};

// ========================================
// VALIDACIÓN Y MENSAJES
// ========================================

/**
 * Story que demuestra el uso de mensajes de validación con truncamiento.
 *
 * NOTA: El componente Input NO renderiza mensajes por sí mismo.
 * Los mensajes se deben añadir manualmente usando la clase .input__message
 * desde el componente padre (como FormField o cualquier wrapper).
 *
 * Los estilos .input__message y .input__message--truncated están disponibles
 * en input.module.scss para uso externo.
 */
export const WithValidationMessages: Story = {
  name: 'Con Mensajes de Validación',
  render: () => {
    const [email, setEmail] = useState('usuario@ejemplo.com');
    const [password, setPassword] = useState('');
    const [longMessage] = useState(
      'Este campo es requerido y debe contener un valor válido. Por favor, introduce al menos 8 caracteres incluyendo letras y números para garantizar la seguridad.',
    );

    const emailError = email && !email.includes('@');
    const passwordError = password && password.length < 8;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          minWidth: '400px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Mensajes de Error Simples
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              error={Boolean(emailError) || undefined}
              iconoIzquierda="mail"
            />
            {emailError && (
              <div
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  color: 'var(--color-error)',
                  marginTop: '4px',
                }}
              >
                Introduce un email válido
              </div>
            )}
          </div>

          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              error={Boolean(passwordError) || undefined}
              iconoIzquierda="lock"
            />
            {passwordError && (
              <div
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  color: 'var(--color-error)',
                  marginTop: '4px',
                }}
              >
                La contraseña debe tener al menos 8 caracteres
              </div>
            )}
          </div>
        </div>

        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Mensaje Largo con Truncamiento
          </h3>
          <Input type="text" placeholder="Campo requerido" error={true} />
          <div
            style={{
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color: 'var(--color-error)',
              marginTop: '4px',
              maxWidth: '100%',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordWrap: 'break-word',
              cursor: 'help',
              position: 'relative',
            }}
            title={longMessage}
          >
            {longMessage}
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            background: 'var(--color-gray-50)',
            borderRadius: '4px',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          <strong>💡 Nota Importante:</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            El componente Input{' '}
            <strong>no renderiza mensajes de error por sí mismo</strong>. Los
            mensajes deben añadirse desde el componente padre. Las clases de
            estilo
            <code
              style={{
                padding: '0 4px',
                background: 'var(--color-white)',
                borderRadius: '2px',
                margin: '0 4px',
              }}
            >
              .input__message
            </code>
            y
            <code
              style={{
                padding: '0 4px',
                background: 'var(--color-white)',
                borderRadius: '2px',
                margin: '0 4px',
              }}
            >
              .input__message--truncated
            </code>
            están disponibles en <code>input.module.scss</code> para uso en
            componentes wrapper como FormField.
          </p>
        </div>
      </div>
    );
  },
};

// ========================================
// ALINEACIÓN DE TEXTO
// ========================================

/**
 * Story que demuestra la alineación del texto dentro del input.
 * Útil para campos numéricos, monedas, o idiomas RTL.
 */
export const WithTextAlignment: Story = {
  name: 'Con Alineación de Texto',
  render: () => {
    const [leftValue, setLeftValue] = useState('Texto alineado a la izquierda');
    const [rightValue, setRightValue] = useState('1.234,56');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '500px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Alineación a la Izquierda (Por Defecto)
          </h3>
          <Input
            type="text"
            value={leftValue}
            onChange={(e) => setLeftValue(e.target.value)}
            textAlign="left"
            iconoIzquierda="user"
          />
        </div>

        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Alineación a la Derecha
          </h3>
          <p
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.875rem',
              color: 'var(--color-gray-600)',
            }}
          >
            Ideal para números, monedas y valores numéricos
          </p>
          <Input
            type="text"
            value={rightValue}
            onChange={(e) => setRightValue(e.target.value)}
            textAlign="right"
            placeholder="0,00"
          />
        </div>

        <div>
          <h3
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '600',
            }}
          >
            Ejemplos Prácticos
          </h3>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Importe (€)
              </label>
              <Input
                type="text"
                defaultValue="1.234,56"
                textAlign="right"
                placeholder="0,00"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Cantidad
              </label>
              <Input
                type="number"
                defaultValue="42"
                textAlign="right"
                placeholder="0"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Código Postal
              </label>
              <Input
                type="text"
                defaultValue="28001"
                textAlign="right"
                placeholder="00000"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
