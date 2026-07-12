import { Fragment, ReactNode } from 'react';
import { TextButton } from '../../base/text-button/text-button';

const TOKEN_REGEX = /\{([^}]+)\}([\s\S]*?)\{\/\1\}/g;

export type InteractiveAction = {
  ariaLabel?: string;
  onClick: () => void;
};

export type InteractiveActions = Record<string, InteractiveAction | undefined>;

/**
 * Hook para parsear texto con marcadores de acción {id}texto{/id}
 * y convertirlos en elementos React interactivos.
 *
 * @param text - Texto con marcadores en formato {id}texto{/id}
 * @param actions - Mapa de acciones asociadas a los identificadores
 * @returns Array de nodos React (texto + botones interactivos)
 *
 */
export const useInteractiveText = (
  text: string,
  actions?: InteractiveActions,
): ReactNode[] => {
  if (!actions) return [text];

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    const [fullMatch, actionId, innerText] = match;

    // Texto previo al marcador
    const matchStart = match.index;

    if (matchStart > lastIndex) {
      const textSegment = text.slice(lastIndex, matchStart);
      nodes.push(<Fragment key={`text-${lastIndex}`}>{textSegment}</Fragment>);
    }

    // Renderizar acción interactiva o texto plano
    const action = actions[actionId];

    if (action?.onClick) {
      nodes.push(
        <TextButton
          key={`action-${actionId}-${matchStart}`}
          onClick={action.onClick}
          aria-label={action.ariaLabel}
        >
          {innerText}
        </TextButton>,
      );
    } else {
      nodes.push(
        <Fragment key={`missing-${actionId}-${matchStart}`}>
          {innerText}
        </Fragment>,
      );
    }

    lastIndex = matchStart + fullMatch.length;
  }

  // Texto restante
  if (lastIndex < text.length) {
    nodes.push(
      <Fragment key={`text-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>,
    );
  }

  return nodes;
};
