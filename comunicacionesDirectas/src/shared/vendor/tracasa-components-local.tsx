import React, {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type Dispatch,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

export type IconName = string;

export type AvisoProps = {
  message?: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | string;
  duration?: number;
  className?: string;
  onClose?: () => void;
};

export type IconWrapperProps = {
  icono?: IconName;
  size?: 'sm' | 'md' | 'lg' | number;
  title?: string;
  stroke?: number;
  color?: string;
  className?: string;
  role?: string;
  textoAccesibilidad?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

export type ResultadoSubirFichero = {
  localizador?: string;
  calidadPDF?: string | number;
};

export enum TiposAsuntoEnum {
  General = 'General',
}

export enum TiposProcedimientoEnum {
  General = 'General',
}

export enum ProcedenciasArchivo {
  PortalDocumentacion = 'PortalDocumentacion',
}

export enum TiposDescarga {
  Archivo = 'Archivo',
}

export enum TiposIDElemento {
  Archivo = 'Archivo',
}

export enum OrigenesFicherosEnum {
  Avantius = 'Avantius',
}

export enum TiposExpediente {
  Expediente = 'Expediente',
}

export enum EstadosBocadillo {
  Enviado = 'Enviado',
  Error = 'Error',
  Leido = 'Leido',
}

export type Procedimiento = {
  numeroProcedimiento?: string;
  anoProcedimiento?: string;
  pieza?: string;
  [key: string]: unknown;
};

export type OpcionSelector = {
  label?: string;
  value?: string | number;
  [key: string]: unknown;
};

export type Automatismos = Record<string, unknown>;
export type AccionTarjetaTramitacionGuiadaIA = Record<string, unknown>;
export type GrupoExpedientes = Record<string, unknown>;

export type AccionTarjeta = {
  idAccion?: string | number;
  titulo?: string;
  onClick?: () => void;
  [key: string]: unknown;
};

export type DatosElementoADescargar = {
  IDTipoDescarga?: TiposDescarga | string;
  IDElemento?: string;
  LocalizadorElemento?: string;
  TipoIDElemento?: TiposIDElemento | string;
  Titulo?: string;
  ProcedenciaArchivo?: ProcedenciasArchivo | string;
  [key: string]: unknown;
};

export type DatosElementosAConsolidar = {
  titulo?: string;
  NombreFichero?: string;
  nombreArchivo?: string;
  localizador?: string;
  FechaDocumento?: string | Date | null;
  IdCategoria?: number;
  Calidad?: string | number;
  EsDiligencia?: boolean;
  EsPrincipal?: boolean;
  tipoExpediente?: TiposExpediente | string;
  acciones?: { iconoIzquierda?: IconName; textoDescriptivo?: string; accion: (item: any) => void }[];
  [key: string]: unknown;
};

export type ElementoListadoProps<T = Record<string, unknown>> = T & {
  id: number;
  titulo?: string;
  acciones?: { iconoIzquierda?: IconName; textoDescriptivo?: string; accion: (item: ElementoListadoProps<T>) => void }[];
  [key: string]: unknown;
};

export type BocadilloProps = {
  texto?: string;
  fecha?: Date;
  estado?: EstadosBocadillo;
  esPropio?: boolean;
  esGenerico?: boolean;
  esAdjunto?: boolean;
  onClickEnAdjuntos?: () => void;
  idEnMemoria?: string;
};

type BasicColumnDef<T> = {
  id?: keyof T | string;
  texto?: string;
  tipo?: 'input' | 'fechaYHora' | string;
  alinear?: string;
  tamano?: number;
  handleCellChange?: (id: number, value: string | null) => void;
  [key: string]: unknown;
};

export function createColumnDefsInput<TColumn>(
  _columnHelper: TColumn,
  columnDefs: BasicColumnDef<any>[],
) {
  return columnDefs as any[];
}

const iconMap: Record<string, string> = {
  archive: '🗄',
  arrowNarrowLeft: '←',
  infoCircle: 'ℹ',
  checks: '✓',
  warning: '⚠',
  messageOff: '✕',
  arrowRightToArc: '🗑',
  send: '➤',
  paperclip: '📎',
};

const fileStore = new Map<string, File>();

function getStoredFileId(_file: File) {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function registerLocalFile(file: File) {
  const fileId = getStoredFileId(file);
  fileStore.set(fileId, file);
  return fileId;
}

function triggerFileDownload(file: File, fileName?: string) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName || file.name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buttonStyle(kind: 'primary' | 'secondary' | 'ghost' = 'primary'): CSSProperties {
  if (kind === 'secondary') {
    return {
      padding: '0.625rem 1rem',
      borderRadius: 8,
      border: '1px solid #c7d2da',
      background: '#fff',
      color: '#1f2d3d',
      cursor: 'pointer',
    };
  }

  if (kind === 'ghost') {
    return {
      padding: '0.5rem',
      borderRadius: 8,
      border: 'none',
      background: 'transparent',
      color: '#1f2d3d',
      cursor: 'pointer',
    };
  }

  return {
    padding: '0.625rem 1rem',
    borderRadius: 8,
    border: '1px solid #125f91',
    background: '#125f91',
    color: '#fff',
    cursor: 'pointer',
  };
}

export function IconWrapper({
  icono,
  size = 'md',
  title,
  color,
  className,
  role,
  textoAccesibilidad,
  tabIndex,
  ariaHidden,
  onClick,
  onKeyDown,
}: IconWrapperProps) {
  const fontSize = typeof size === 'number' ? size : size === 'sm' ? 14 : size === 'lg' ? 24 : 18;
  return (
    <span
      title={title}
      className={className}
      role={role ?? (onClick ? 'button' : 'img')}
      aria-label={textoAccesibilidad ?? title ?? icono}
      aria-hidden={ariaHidden}
      tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        color: color ?? 'currentColor',
        minWidth: fontSize,
      }}
    >
      {iconMap[icono ?? ''] ?? '•'}
    </span>
  );
}

export function Aviso({ message, variant = 'info', duration, className, onClose }: AvisoProps) {
  useEffect(() => {
    if (!duration || !onClose) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  const background =
    variant === 'success' ? '#e6f7ec' : variant === 'error' ? '#fdecec' : variant === 'warning' ? '#fff4dd' : '#e8f1fb';

  return (
    <div className={className} style={{ padding: '0.75rem 1rem', borderRadius: 10, background }}>
      {message}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'principal' | 'secondary' | string;
  textoAccesibilidad?: string;
  icono?: IconName;
};

export function Button({ children, variant, textoAccesibilidad, icono, style, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      aria-label={textoAccesibilidad ?? props['aria-label']}
      style={{ ...buttonStyle(variant === 'secondary' ? 'secondary' : 'primary'), ...style }}
    >
      {icono ? <IconWrapper icono={icono} /> : null}
      {children}
    </button>
  );
}

export function TextButton({ children, icono, style, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button {...props} style={{ ...buttonStyle('secondary'), display: 'inline-flex', gap: 8, alignItems: 'center', ...style }}>
      {icono ? <IconWrapper icono={icono} /> : null}
      {children}
    </button>
  );
}

export function IconButton({ icon, icono, children, style, ...props }: PropsWithChildren<ButtonProps & { icon?: IconName }>) {
  return (
    <button {...props} style={{ ...buttonStyle('ghost'), display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
      <IconWrapper icono={icono ?? icon} />
      {children}
    </button>
  );
}

export const InputSearch = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function InputSearch(props, ref) {
  return (
    <input
      ref={ref}
      type="search"
      {...props}
      style={{
        width: '100%',
        padding: '0.625rem 0.875rem',
        borderRadius: 8,
        border: '1px solid #c7d2da',
        ...props.style,
      }}
    />
  );
});

export function Mensaje({ children, message, variant }: PropsWithChildren<{ message?: ReactNode; variant?: string }>) {
  const background = variant === 'warning' ? '#fff4dd' : '#f5f7fa';
  return <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background }}>{children ?? message}</div>;
}

export function IconoCarga({ texto, minimal }: { texto?: ReactNode; minimal?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: minimal ? 14 : 16 }}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #cbd5e1', borderTopColor: '#125f91', display: 'inline-block' }} />
      {texto ? <span>{texto}</span> : null}
    </div>
  );
}

type ModalProps = PropsWithChildren<{
  isOpen?: boolean;
  onClose?: () => void;
  size?: 'medium' | 'large' | 'wide' | string;
  disableCloseOnClickOutside?: boolean;
}>;

type ModalSectionProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function ModalHeader({ children, ...props }: ModalSectionProps) {
  return <div {...props} style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', fontWeight: 600, ...props.style }}>{children}</div>;
}

function ModalBody({ children, ...props }: ModalSectionProps) {
  return <div {...props} style={{ padding: '1rem 1.25rem', ...props.style }}>{children}</div>;
}

function ModalFooter({ children, ...props }: ModalSectionProps) {
  return <div {...props} style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 12, justifyContent: 'flex-end', ...props.style }}>{children}</div>;
}

type ModalComponent = ((props: ModalProps) => React.JSX.Element | null) & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

export const Modal: ModalComponent = Object.assign(function Modal({ isOpen, onClose, size = 'medium', disableCloseOnClickOutside, children }: ModalProps) {
  if (!isOpen) return null;

  const width = size === 'wide' ? 960 : size === 'large' ? 720 : 560;

  return (
    <div
      onClick={() => {
        if (!disableCloseOnClickOutside) {
          onClose?.();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{ width: '100%', maxWidth: width, background: '#fff', borderRadius: 14, boxShadow: '0 24px 64px rgba(15, 23, 42, 0.22)' }}
      >
        {children}
      </div>
    </div>
  );
}, { Header: ModalHeader, Body: ModalBody, Footer: ModalFooter });

export function BarraHerramientas({ children }: PropsWithChildren) {
  return <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '0.5rem 0' }}>{children}</div>;
}

export function RowLayout({ children, alignItems = 'stretch', justifyContent = 'flex-start', space = 0.5, style, className }: PropsWithChildren<{ alignItems?: CSSProperties['alignItems']; justifyContent?: CSSProperties['justifyContent']; space?: number; style?: CSSProperties; className?: string }>) {
  return <div className={className} style={{ display: 'flex', alignItems, justifyContent, gap: `${space}rem`, ...style }}>{children}</div>;
}

export function TituloCabecera({ children }: PropsWithChildren) {
  return <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>{children}</h2>;
}

export function EmptyState({ children, titulo, icono, link }: PropsWithChildren<{ titulo?: ReactNode; icono?: IconName; link?: { texto: ReactNode; onClick?: () => void } }>) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: 240, padding: '2rem', textAlign: 'center', color: '#344054' }}>
      <div style={{ maxWidth: 560, display: 'grid', gap: 12 }}>
        {icono ? <div style={{ fontSize: 32 }}><IconWrapper icono={icono} /></div> : null}
        {titulo ? <h3 style={{ margin: 0 }}>{titulo}</h3> : null}
        {children ? <div>{children}</div> : null}
        {link ? <div><TextButton onClick={link.onClick}>{link.texto}</TextButton></div> : null}
      </div>
    </div>
  );
}

type LayoutHeader = {
  buttonLeft?: IconName;
  onClickButtonLeft?: () => void;
  buttonRight?: IconName;
  onClickButtonRight?: () => void;
  textLeft?: ReactNode;
  textRight?: ReactNode;
};

export function LayoutComunicaciones({ sidebar, contenido, header, mostrarHeader }: { sidebar?: ReactNode; contenido?: ReactNode; header?: LayoutHeader; mostrarHeader?: boolean; colapsableSidebar?: boolean; esVistaDetalle?: boolean; }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', minHeight: 'calc(100vh - var(--header-height, 72px))', background: '#f7fafc' }}>
      <aside style={{ borderRight: '1px solid #dbe4ea', background: '#fff', padding: '1rem', overflow: 'auto' }}>{sidebar}</aside>
      <section style={{ display: 'grid', gridTemplateRows: mostrarHeader ? 'auto 1fr' : '1fr', minWidth: 0 }}>
        {mostrarHeader ? (
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '1rem 1.25rem', borderBottom: '1px solid #dbe4ea', background: '#fff' }}>
            <RowLayout alignItems="center">
              {header?.buttonLeft ? <IconButton icono={header.buttonLeft} onClick={header.onClickButtonLeft} /> : null}
              <div style={{ fontWeight: 600 }}>{header?.textLeft}</div>
            </RowLayout>
            <RowLayout alignItems="center">
              {header?.textRight ? <div style={{ color: '#667085' }}>{header.textRight}</div> : null}
              {header?.buttonRight ? <IconButton icono={header.buttonRight} onClick={header.onClickButtonRight} /> : null}
            </RowLayout>
          </header>
        ) : null}
        <div style={{ overflow: 'auto' }}>{contenido}</div>
      </section>
    </div>
  );
}

export function CabeceraAvantius({ title }: { title?: ReactNode; subtitle?: ReactNode; menuConfig?: unknown[]; mostrarAccionesTramitacion?: boolean; }) {
  return (
    <header style={{ display: 'flex', alignItems: 'center', minHeight: 'var(--header-height, 72px)', padding: '0 1.25rem', background: '#125f91', color: '#fff', fontWeight: 600 }}>
      <div>{title}</div>
    </header>
  );
}

export function GlobalLayout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={className} style={{ minHeight: '100vh', background: '#f7fafc' }}>{children}</div>;
}

export function TarjetaComunicacion({ titulo, subtitulo, notaSuperior, icono, colorIcono, texto, onClick, seleccionada, esBoton, contador }: { id?: number; titulo?: ReactNode; subtitulo?: ReactNode; notaSuperior?: ReactNode; icono?: IconName; colorIcono?: string; texto?: ReactNode; onClick?: () => void; seleccionada?: boolean; archivada?: boolean; disabled?: boolean; esBoton?: boolean; contador?: number; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '1rem',
        borderRadius: 12,
        border: seleccionada ? '1px solid #125f91' : '1px solid #dbe4ea',
        background: seleccionada ? '#eef6fb' : '#fff',
        cursor: 'pointer',
        display: 'grid',
        gap: 8,
        marginBottom: 8,
      }}
    >
      <RowLayout justifyContent="space-between" alignItems="center">
        <strong>{titulo}</strong>
        {contador ? <span style={{ minWidth: 24, padding: '0.125rem 0.5rem', borderRadius: 999, background: '#125f91', color: '#fff', fontSize: 12 }}>{contador}</span> : null}
      </RowLayout>
      {notaSuperior ? <div style={{ fontSize: 12, color: '#667085' }}>{notaSuperior}</div> : null}
      {subtitulo ? <div style={{ color: '#344054' }}>{subtitulo}</div> : null}
      {texto ? (
        <RowLayout alignItems="center">
          {icono ? <IconWrapper icono={icono} color={colorIcono === 'primario' ? '#125f91' : '#667085'} /> : null}
          <div style={{ color: '#667085' }}>{texto}</div>
        </RowLayout>
      ) : null}
      {esBoton ? <div style={{ color: '#125f91', fontSize: 12 }}>Abrir</div> : null}
    </button>
  );
}

export function ChatLayout({ mensajes, onEnviar, onAdjuntar, maxLength, readonly, textReadonly }: { mensajes: BocadilloProps[]; onEnviar?: (textoInput: string) => void | Promise<void>; onAdjuntar?: () => void; maxLength?: number; readonly?: boolean; textReadonly?: ReactNode; }) {
  const [texto, setTexto] = useState('');

  const enviar = async () => {
    if (!texto.trim() || readonly) return;
    await onEnviar?.(texto);
    setTexto('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: 'calc(100vh - 180px)', background: '#fff' }}>
      <div style={{ padding: '1rem 1.25rem', overflow: 'auto', display: 'grid', gap: 12 }}>
        {mensajes.map((mensaje, index) => (
          <div key={mensaje.idEnMemoria ?? index} style={{ justifySelf: mensaje.esPropio ? 'end' : 'start', maxWidth: '70%', background: mensaje.esGenerico ? '#f4f4f5' : mensaje.esPropio ? '#dbeafe' : '#f8fafc', borderRadius: 14, padding: '0.75rem 1rem' }}>
            <div>{mensaje.texto}</div>
            {mensaje.esAdjunto ? <button type="button" onClick={mensaje.onClickEnAdjuntos} style={{ marginTop: 8, ...buttonStyle('secondary') }}>Descargar adjunto</button> : null}
            <div style={{ marginTop: 6, fontSize: 12, color: '#667085' }}>{mensaje.fecha?.toLocaleString?.() ?? ''}</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #e5e7eb', padding: '1rem 1.25rem', display: 'grid', gap: 8 }}>
        {readonly ? <div style={{ color: '#b42318' }}>{textReadonly}</div> : null}
        <textarea value={texto} onChange={(event) => setTexto(event.target.value)} maxLength={maxLength} rows={3} disabled={readonly} style={{ width: '100%', resize: 'vertical', borderRadius: 10, border: '1px solid #cbd5e1', padding: '0.75rem' }} />
        <RowLayout justifyContent="space-between" alignItems="center">
          <IconButton icono="paperclip" onClick={onAdjuntar} aria-label="Adjuntar" />
          <Button onClick={enviar} disabled={readonly || !texto.trim()} icono="send">Enviar</Button>
        </RowLayout>
      </div>
    </div>
  );
}

type SubidaFicherosProps<T> = {
  onFicheroSeleccionado?: (ficheros: File[]) => void;
  maxFicheros?: number;
  extensionesPermitidas?: string[];
  tamanoTotalficherosPermitido?: number;
  tamanoPagina?: number;
  columnas: any[];
  datos: ElementoListadoProps<T>[];
  estructuraDetalle?: (item: ElementoListadoProps<T>) => ReactNode;
  disabled?: boolean;
  onFicheroSubido: (resultado: ResultadoSubirFichero, nombreFichero: string) => Promise<void> | void;
  setActualizarListado?: Dispatch<SetStateAction<boolean>>;
  actualizarListado?: boolean;
  setDatos?: Dispatch<SetStateAction<ElementoListadoProps<T>[]>>;
  ocultarListado?: boolean;
  sinScroll?: boolean;
  permiteReordenar?: boolean;
  error?: boolean;
};

export function SubidaFicheros<T extends DatosElementosAConsolidar>({ extensionesPermitidas = [], tamanoTotalficherosPermitido = 0, columnas, datos, onFicheroSubido, ocultarListado, disabled }: SubidaFicherosProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const accept = extensionesPermitidas.length > 0 ? extensionesPermitidas.join(',') : undefined;

  const procesarFicheros = async (files: FileList | null) => {
    if (!files) return;
    const items = Array.from(files);
    const totalSize = items.reduce((sum, file) => sum + file.size, 0);
    if (tamanoTotalficherosPermitido > 0 && totalSize > tamanoTotalficherosPermitido) {
      console.error('Se supera el tamaño máximo permitido.');
      return;
    }

    for (const file of items) {
      const fileId = registerLocalFile(file);
      await onFicheroSubido({ localizador: fileId, calidadPDF: 'Alta' }, file.name);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <input ref={inputRef} type="file" multiple accept={accept} style={{ display: 'none' }} onChange={(event) => { void procesarFicheros(event.target.files); event.currentTarget.value = ''; }} />
      <Button type="button" onClick={() => inputRef.current?.click()} disabled={disabled}>Seleccionar archivos</Button>
      {!ocultarListado ? null : (
        <div style={{ display: 'grid', gap: 8 }}>
          {datos.map((item) => (
            <div key={item.id} style={{ border: '1px solid #dbe4ea', borderRadius: 10, padding: '0.75rem', display: 'grid', gap: 8 }}>
              {columnas.map((columna) => {
                const value = columna.id ? item[columna.id as keyof typeof item] : undefined;
                if (columna.tipo === 'fechaYHora') {
                  return (
                    <label key={String(columna.id ?? columna.texto)} style={{ display: 'grid', gap: 4 }}>
                      <span>{columna.texto}</span>
                      <input type="datetime-local" value={value instanceof Date ? value.toISOString().slice(0, 16) : typeof value === 'string' ? value : ''} onChange={(event) => columna.handleCellChange?.(item.id, event.target.value)} />
                    </label>
                  );
                }
                return (
                  <label key={String(columna.id ?? columna.texto)} style={{ display: 'grid', gap: 4 }}>
                    <span>{columna.texto}</span>
                    <input value={typeof value === 'string' ? value : ''} onChange={(event) => columna.handleCellChange?.(item.id, event.target.value)} />
                  </label>
                );
              })}
              {item.acciones?.map((accion, index) => (
                <TextButton key={index} type="button" onClick={() => accion.accion(item)} icono={accion.iconoIzquierda}>{accion.textoDescriptivo ?? 'Acción'}</TextButton>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ArbolRelacionados({ expedientesOrgano }: { expedientesOrgano?: GrupoExpedientes[] }) {
  const renderNode = (node: unknown, key: string) => {
    if (node == null) return null;
    if (Array.isArray(node)) {
      return <ul key={key} style={{ margin: 0, paddingLeft: 20 }}>{node.map((item, index) => <li key={`${key}-${index}`}>{renderNode(item, `${key}-${index}`)}</li>)}</ul>;
    }
    if (typeof node === 'object') {
      const record = node as Record<string, unknown>;
      const title = (record.titulo ?? record.nombre ?? record.id ?? 'Elemento') as ReactNode;
      const children = (record.hijos ?? record.expedientes ?? record.expedientesOrgano) as unknown;
      return (
        <div key={key} style={{ display: 'grid', gap: 8 }}>
          <div style={{ fontWeight: 600 }}>{title}</div>
          {children ? renderNode(children, `${key}-children`) : null}
        </div>
      );
    }
    return <span key={key}>{String(node)}</span>;
  };

  return <div style={{ display: 'grid', gap: 12 }}>{renderNode(expedientesOrgano ?? [], 'root')}</div>;
}

export function useFileHandler() {
  const descargarElemento = async (elemento: DatosElementoADescargar) => {
    const key = elemento.IDElemento ?? elemento.LocalizadorElemento;
    if (!key) return;
    const file = fileStore.get(key);
    if (!file) {
      console.warn('No se ha encontrado el fichero solicitado en almacenamiento local.');
      return;
    }
    triggerFileDownload(file, elemento.Titulo);
  };

  const consolidarArchivo = async (elemento: DatosElementosAConsolidar) => {
    return String(elemento.localizador ?? '');
  };

  const obtenerTamanoMaximoFicheroASubir = async () => ({
    [OrigenesFicherosEnum.Avantius]: 25 * 1024 * 1024,
  });

  const obtenerExtensionesPermitidas = async () => [
    { extension: '.pdf' },
    { extension: '.docx' },
    { extension: '.xlsx' },
    { extension: '.png' },
    { extension: '.jpg' },
    { extension: '.jpeg' },
  ];

  return {
    descargarElemento,
    consolidarArchivo,
    obtenerTamanoMaximoFicheroASubir,
    obtenerExtensionesPermitidas,
  };
}