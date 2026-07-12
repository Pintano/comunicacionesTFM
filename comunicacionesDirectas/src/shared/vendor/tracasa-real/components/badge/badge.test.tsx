import { render, screen, cleanup, within } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import styles from './badge.module.scss';
import { Badge } from './badge';

describe('Badge', () => {
  afterEach(() => {
    cleanup();
  });

  it('Debe renderizarse correctamente sin notificaciones', () => {
    const { container } = render(<Badge />);
    const badge = container.firstChild as HTMLElement;
    const scoped = within(container);

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles.badge);
    expect(badge).not.toHaveClass(styles.numerico);
    expect(badge).not.toHaveClass(styles.full);

    const spanConteo = scoped.queryByText(/^\d+$/);
    expect(spanConteo).not.toBeInTheDocument();
  });

  it('Debe renderizarse correctamente con 0 notificaciones', () => {
    const { container } = render(<Badge count={0} />);
    const badge = container.firstChild as HTMLElement;
    const scoped = within(container);

    expect(badge).toHaveClass(styles.badge);
    expect(badge).not.toHaveClass(styles.numerico);
    expect(badge).not.toHaveClass(styles.full);

    const spanConteo = scoped.queryByText('0');
    expect(spanConteo).not.toBeInTheDocument();
  });

  it('Debe mostrar el numero para notificaciones positivas menores de 99', () => {
    const { container } = render(<Badge count={50} />);
    const badge = container.firstChild as HTMLElement;
    const scoped = within(container);
    const spanConteo = scoped.getByText('50');

    expect(badge).toHaveClass(styles.badge, styles['badge--numeric']);
    expect(badge).not.toHaveClass(styles['badge--overflow']);
    expect(spanConteo).toBeInTheDocument();
    expect(spanConteo).toHaveClass(styles.badge__count);
  });

  it('Debe mostrar "99+" para notificaciones mayores de 99', () => {
    const { container } = render(<Badge count={150} />);
    const badge = container.firstChild as HTMLElement;
    const scoped = within(container);
    const spanConteo = scoped.getByText('99+');

    expect(badge).toHaveClass(
      styles.badge,
      styles['badge--numeric'],
      styles['badge--overflow'],
    );
    expect(spanConteo).toBeInTheDocument();
    expect(spanConteo).toHaveClass(styles.badge__count);

    const numeroReal = scoped.queryByText('150');
    expect(numeroReal).not.toBeInTheDocument();
  });
});
