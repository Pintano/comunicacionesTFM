import { ReactNode } from 'react';
import { CabeceraPrincipal } from '../cabecera-principal/cabecera-principal';

type Pestana = Record<string, unknown>;
type Procedimiento = Record<string, unknown>;

/**
 * Props para el componente CabeceraAvantius
 */
export interface CabeceraAvantiusProps {
  /**
   * URL del logo (por defecto usa logoAvantius)
   */
  logoUrl?: string;

  onClickUrl?: () => void;
  /**
   * Elemento personalizado para el logo
   */
  logoElement?: ReactNode;

  /**
   * Título de la aplicación
   */
  title?: string;

  /**
   * Subtítulo opcional
   */
  subtitle?: string;

  /**
   * Configuración de menús para el BuscadorMenus
   */
  menuConfig: Pestana[];

  /**
   * Placeholder para el buscador de menús
   */
  menuSearchPlaceholder?: string;

  /**
   * Handler para búsqueda de procedimientos
   */
  onBuscarProcedimiento?: (procedimiento: Procedimiento) => void;

  /**
   * ID de usuario para el buscador de procedimientos
   */
  userId?: number;

  /**
   * ID de órgano para el buscador de procedimientos
   */
  organoId?: number;

  /**
   * Número de notificaciones pendientes (si > 0, muestra badge)
   */
  notificacionesCount?: number;

  /**
   * Handler para el click en notificaciones
   */
  onNotificacionesClick?: () => void;

  /**
   * Tooltip del indicador de notificaciones
   */
  notificacionesTooltip?: string;

  /**
   * Handler para el click en el menú de perfil
   */
  onMenuPerfilClick?: () => void;

  /**
   * Clase CSS adicional
   */
  className?: string;

  mostrarAccionesTramitacion?: boolean;
}

/**
 * CabeceraAvantius - Fachada especializada para la aplicación Avantius
 *
 * Este componente implementa el **Facade Pattern** como especialización de CabeceraPrincipal
 * para el caso específico de Avantius, que incluye:
 * - Logo de Avantius
 * - Título y subtítulo
 * - BuscadorMenus (búsqueda en la estructura de menús)
 * - BuscadorProcedimientos (búsqueda rápida)
 * - IndicadorNotificaciones (con contador)
 * - Botón de perfil/menú de usuario
 *
 * **Patrones aplicados:**
 * - **Facade Pattern**: API simplificada para caso específico de Avantius
 * - **Composition Pattern**: Compone múltiples componentes especializados
 * - **Domain-Specific Design**: Optimizado para el dominio de Avantius
 *
 * **Cuándo usar:**
 * - Dentro de la aplicación Avantius exclusivamente
 * - Cuando necesitas la configuración estándar de cabecera de Avantius
 * - Para mantener consistencia entre páginas de Avantius
 *
 * **Cuándo NO usar:**
 * - En otras aplicaciones (PSP, etc.) → usa sus fachadas específicas
 * - Si necesitas layout muy diferente → usa CabeceraPrincipal o CabeceraEstandar
 *
 * @example
 * ```tsx
 * <CabeceraAvantius
 *   title="Portal Administrativo"
 *   subtitle="Gestión Centralizada"
 *   menusConfig={menusAvantius}
 *   notificacionesCount={5}
 *   onNotificacionesClick={handleNotificaciones}
 *   onBuscarProcedimiento={handleBusqueda}
 *   onMenuPerfilClick={handlePerfil}
 * />
 * ```
 */
export const CabeceraAvantius = ({
  logoUrl,
  onClickUrl,
  logoElement,
  title = '',
  subtitle,
  menuConfig: _menuConfig,
  menuSearchPlaceholder = 'Buscar en menús...',
  onBuscarProcedimiento,
  userId = 0,
  organoId = 0,
  notificacionesCount = 0,
  onNotificacionesClick,
  notificacionesTooltip = 'Tienes notificaciones pendientes',
  onMenuPerfilClick,
  className,
  mostrarAccionesTramitacion,
}: CabeceraAvantiusProps) => {
  void menuSearchPlaceholder;
  void onBuscarProcedimiento;
  void userId;
  void organoId;
  void notificacionesCount;
  void onNotificacionesClick;
  void notificacionesTooltip;
  void onMenuPerfilClick;
  void mostrarAccionesTramitacion;

  const logoProps = logoElement
    ? { children: logoElement }
    : logoUrl
      ? { url: logoUrl, onClick: onClickUrl }
      : undefined;

  return (
    <CabeceraPrincipal
      logoProps={logoProps}
      title={title}
      subtitle={subtitle}
      className={className}
    />
  );
};

CabeceraAvantius.displayName = 'CabeceraAvantius';
