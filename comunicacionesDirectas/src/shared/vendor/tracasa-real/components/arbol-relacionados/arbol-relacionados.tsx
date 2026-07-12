import { useId, useState } from 'react';

import { Checkbox } from '../base/inputs-and-formularios/checkbox/checkbox';
import { IconWrapper } from '../icono/icon-wrapper/icon-wrapper';
import classNames from 'classnames';
import styles from './arbol-relacionados.module.scss';
import useComponentsTranslation from '../../hooks/use-translation';

export interface ExpedienteArbol {
  titulo: string;
  descripcionExpedienteArbol: string;
  idObjetoEncriptado: string;
  sinPermiso: boolean;
  activo: boolean;
  onClick?: (idObjeto: string) => void;
  subExpedientes?: ExpedienteArbol[];
  esAdministrativo?: boolean;
}

export interface GrupoExpedientes {
  id: number;
  nombreOrgano: string;
  expedientes: ExpedienteArbol[];
}

interface ArbolRelacionadosProps {
  expedientesOrgano: GrupoExpedientes[];
  conSeleccion?: boolean;
  conAcordeon?: boolean;
  expedientesSeleccionados?: string[];
  onSeleccionChange?: (expedientesSeleccionados: string[]) => void;
}

export function ArbolRelacionados({
  expedientesOrgano,
  conSeleccion = false,
  conAcordeon = false,
  expedientesSeleccionados = [],
  onSeleccionChange,
}: ArbolRelacionadosProps) {
  const prefix = useId();
  const { t } = useComponentsTranslation();
  const [seleccionados, setSeleccionados] = useState<string[]>(
    expedientesSeleccionados,
  );
  const [arbolExpandido, setArbolExpandido] = useState<boolean>(true);

  const obtenerTodosLosIdsExpandibles = (
    expedientes: ExpedienteArbol[],
  ): string[] => {
    const ids: string[] = [];
    expedientes.forEach((exp) => {
      if (exp.subExpedientes && exp.subExpedientes.length > 0) {
        ids.push(exp.idObjetoEncriptado);
        ids.push(...obtenerTodosLosIdsExpandibles(exp.subExpedientes));
      }
    });
    return ids;
  };

  const idsInicialesExpandidos = new Set<number | string>([
    ...expedientesOrgano.map((o) => o.id),
    ...expedientesOrgano.flatMap((organo) =>
      obtenerTodosLosIdsExpandibles(organo.expedientes),
    ),
  ]);

  const [expandidos, setExpandidos] = useState<Set<number | string>>(
    idsInicialesExpandidos,
  );

  const toggleArbolCompleto = () => {
    setArbolExpandido(!arbolExpandido);
  };

  const toggleExpansion = (id: number | string) => {
    setExpandidos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const obtenerTodosLosIds = (expedientes: ExpedienteArbol[]): string[] => {
    const ids: string[] = [];
    expedientes.forEach((exp) => {
      if (!exp.sinPermiso) {
        ids.push(exp.idObjetoEncriptado);
      }
      if (exp.subExpedientes) {
        ids.push(...obtenerTodosLosIds(exp.subExpedientes));
      }
    });
    return ids;
  };

  const todosLosIds = expedientesOrgano.flatMap((organo) =>
    obtenerTodosLosIds(organo.expedientes),
  );

  const todosSeleccionados =
    todosLosIds.length > 0 &&
    todosLosIds.every((id) => seleccionados.includes(id));

  const handleSeleccionChange = (nuevosSeleccionados: string[]) => {
    setSeleccionados(nuevosSeleccionados);
    onSeleccionChange?.(nuevosSeleccionados);
  };

  const handleToggleTodos = () => {
    if (todosSeleccionados) {
      handleSeleccionChange([]);
    } else {
      handleSeleccionChange(todosLosIds);
    }
  };

  const handleToggleExpediente = (idExpediente: string) => {
    const estaSeleccionado = seleccionados.some((exp) => exp === idExpediente);
    const nuevosSeleccionados = estaSeleccionado
      ? seleccionados.filter((exp) => exp !== idExpediente)
      : [...seleccionados, idExpediente];
    handleSeleccionChange(nuevosSeleccionados);
  };

  return (
    <>
      {conSeleccion && todosLosIds.length > 0 && (
        <div className={styles.arbol_relacionados__seleccionar_todos}>
          {conAcordeon && (
            <button
              className={styles.arbol_relacionados__toggle_button}
              onClick={toggleArbolCompleto}
              aria-label={
                arbolExpandido ? t('palabras.contraer') : t('palabras.expandir')
              }
            >
              <IconWrapper
                icono={arbolExpandido ? 'chevronDown' : 'chevronRight'}
                size="sm"
              />
            </button>
          )}
          <Checkbox
            id={`${prefix}-todos`}
            checked={todosSeleccionados}
            onChange={handleToggleTodos}
            textoAccesibilidad={t('arbol-relacionados.seleccionarTodos')}
          />
          <span>{t('arbol-relacionados.seleccionarTodos')}</span>
        </div>
      )}
      {(!conAcordeon || arbolExpandido) && (
        <ul className={styles.arbol_relacionados__list}>
          {expedientesOrgano.map((organoJudicial) => {
            const isExpanded = expandidos.has(organoJudicial.id);
            return (
              <li
                className={styles.arbol_relacionados__item}
                key={organoJudicial.id}
              >
                <div className={styles.arbol_relacionados__organo_judicial}>
                  {conAcordeon && (
                    <button
                      className={styles.arbol_relacionados__toggle_button}
                      onClick={() => toggleExpansion(organoJudicial.id)}
                      aria-label={
                        isExpanded
                          ? t('palabras.contraer')
                          : t('palabras.expandir')
                      }
                    >
                      <IconWrapper
                        icono={isExpanded ? 'chevronDown' : 'chevronRight'}
                        size="sm"
                      />
                    </button>
                  )}
                  <IconWrapper icono="square" size="sm" />
                  <span tabIndex={0}>{organoJudicial.nombreOrgano}</span>
                </div>
                {(!conAcordeon || isExpanded) &&
                  organoJudicial.expedientes.map((exp) => (
                    <ExpedienteRecursivo
                      expediente={exp}
                      key={prefix + exp.titulo}
                      nivel={0}
                      conSeleccion={conSeleccion}
                      conAcordeon={conAcordeon}
                      idsSeleccionados={seleccionados}
                      onToggleSeleccion={handleToggleExpediente}
                      expandidos={expandidos}
                      onToggleExpansion={toggleExpansion}
                    />
                  ))}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function ExpedienteRecursivo({
  expediente,
  nivel,
  conSeleccion = false,
  conAcordeon = false,
  idsSeleccionados = [],
  onToggleSeleccion,
  expandidos,
  onToggleExpansion,
}: {
  expediente: ExpedienteArbol;
  nivel: number;
  conSeleccion?: boolean;
  conAcordeon?: boolean;
  idsSeleccionados?: string[];
  onToggleSeleccion?: (idExpediente: string) => void;
  expandidos: Set<number | string>;
  onToggleExpansion: (id: number | string) => void;
}) {
  const prefix = useId();
  const { t } = useComponentsTranslation();
  const estaSeleccionado = idsSeleccionados.includes(
    expediente.idObjetoEncriptado,
  );
  const tieneSubExpedientes =
    expediente.subExpedientes && expediente.subExpedientes.length > 0;
  const isExpanded = expandidos.has(expediente.idObjetoEncriptado);

  return (
    <div
      className={classNames(styles.expediente__contenedor, {
        [styles.nivel_0]: nivel === 0,
      })}
    >
      <div className={styles.expediente__separador} />
      <div className={styles.expediente__body}>
        <div className={styles.expediente__fila}>
          {conAcordeon && tieneSubExpedientes && (
            <button
              className={styles.expediente__toggle_button}
              onClick={() => onToggleExpansion(expediente.idObjetoEncriptado)}
              aria-label={
                isExpanded ? t('palabras.contraer') : t('palabras.expandir')
              }
            >
              <IconWrapper
                icono={isExpanded ? 'chevronDown' : 'chevronRight'}
                size="sm"
              />
            </button>
          )}
          {conSeleccion && !expediente.sinPermiso && (
            <Checkbox
              id={`${prefix}-${expediente.idObjetoEncriptado}`}
              checked={estaSeleccionado}
              onChange={() =>
                onToggleSeleccion?.(expediente.idObjetoEncriptado)
              }
              className={styles.expediente__checkbox}
              textoAccesibilidad={
                estaSeleccionado
                  ? t('palabras.deseleccionar')
                  : t('palabras.seleccionar')
              }
            />
          )}
          <IconWrapper
            icono={expediente.sinPermiso ? 'lock' : 'folder'}
            size="md"
            stroke={1}
          />
          <span
            aria-pressed={!expediente.sinPermiso && !expediente.activo}
            className={classNames(
              {
                [styles.expediente__link]:
                  !expediente.sinPermiso && !expediente.activo,
              },
              { [styles.expediente__activo]: expediente.activo },
              { [styles.expediente__sin_acceso]: expediente.sinPermiso },
            )}
            onClick={() =>
              !expediente.sinPermiso &&
              expediente.onClick?.(expediente.idObjetoEncriptado)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                !expediente.sinPermiso &&
                  expediente.onClick?.(expediente.idObjetoEncriptado);
              }
            }}
            role="button"
            title={
              (expediente.sinPermiso
                ? t('arbol-relacionados.expedienteSinPermiso')
                : expediente.activo
                  ? t('arbol-relacionados.expedienteSeleccionado')
                  : '') + expediente.descripcionExpedienteArbol
            }
            tabIndex={0}
          >
            {expediente.titulo}
          </span>
        </div>
        {(!conAcordeon || isExpanded) &&
          expediente.subExpedientes?.map((subExp) => (
            <ExpedienteRecursivo
              expediente={subExp}
              key={prefix + subExp.titulo}
              nivel={nivel + 1}
              conSeleccion={conSeleccion}
              conAcordeon={conAcordeon}
              idsSeleccionados={idsSeleccionados}
              onToggleSeleccion={onToggleSeleccion}
              expandidos={expandidos}
              onToggleExpansion={onToggleExpansion}
            />
          ))}
      </div>
    </div>
  );
}
